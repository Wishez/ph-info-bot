import type { GraphQLError } from 'graphql'

interface IGraphqlErrorResponse {
  errors: GraphQLError[]
}
export const isGarphqlErrorResponse = (response: unknown): response is IGraphqlErrorResponse =>
  Array.isArray(((response || {}) as IGraphqlErrorResponse).errors)
