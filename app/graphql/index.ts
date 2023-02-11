import typeGQ from 'type-graphql'
import { ClientResolver } from './Client/Client.resolvers'
import { ProviderResolver } from './Provider/Provider.resolvers'
import { ServiceResolver } from './Service/Service.resolvers'
import { ServiceAttributeResolver } from './ServiceAttribute/ServiceAttribute.resolvers'
import { ServiceCategoryResolver } from './ServiceCategory/ServiceCategory.resolvers'
import { UserResolver } from './User/User.resolvers'

const { buildSchema } = typeGQ

export const getSchema = async () =>
  await buildSchema({
    resolvers: [
      UserResolver,
      ClientResolver,
      ServiceCategoryResolver,
      ServiceAttributeResolver,
      ServiceResolver,
      ProviderResolver,
    ],
  })
