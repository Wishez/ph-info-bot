import Fastify from 'fastify'
import { bot } from '../bot'
import { Env } from '../config/Env'

export const fastify = Fastify({ logger: true })

export const startServer = () => {
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
