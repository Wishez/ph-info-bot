import log4js from 'log4js'
import fetch from 'node-fetch'
import { setGraphQLExecutor } from '../__generated'
import { Env } from '../config/Env'

const graphqlLogger = log4js.getLogger('graphql')

setGraphQLExecutor(async (request, variables) => {
  graphqlLogger.trace(
    request,
    typeof variables === 'object' ? JSON.stringify(variables) : undefined,
  )
  const response = await fetch(`${Env.serverUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request,
      variables,
    }),
  })

  return await response.json()
})
