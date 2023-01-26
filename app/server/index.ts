import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { createYoga } from 'graphql-yoga'
import { bot } from '../bot'
import { Env } from '../config/Env'
import { getSchema } from '../graphql'

export const fastify = Fastify({ logger: true })

export const startServer = async () => {
  const schema = await getSchema()
  const yoga = createYoga<{
    req: FastifyRequest
    reply: FastifyReply
  }>({
    // Integrate Fastify logger
    schema,
    logging: {
      debug: (...args) => args.forEach(arg => fastify.log.debug(arg)),
      info: (...args) => args.forEach(arg => fastify.log.info(arg)),
      warn: (...args) => args.forEach(arg => fastify.log.warn(arg)),
      error: (...args) => args.forEach(arg => fastify.log.error(arg)),
    },
  })

  fastify.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      })
      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })

      reply.status(response.status)

      reply.send(response.body)

      return reply
    },
  })

  fastify.get('/', (_request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.listen({ port: 4243, host: '0.0.0.0' }, err => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    } else {
      bot.setWebHook(Env.serverUrl)
    }
  })
}
