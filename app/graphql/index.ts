import typeGQ from 'type-graphql'
import { UserResolver } from './User/User.resolvers'

const { buildSchema } = typeGQ

export const getSchema = async () =>
  await buildSchema({
    resolvers: [UserResolver],
  })
