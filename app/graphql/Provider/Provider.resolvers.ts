import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Provider } from '../../models/Provider/Provider'
import { IProviderModel } from '../../models/Provider/types'
import { ServiceResolver } from '../Service/Service.resolvers'
import { UserSchema } from '../User/User.schema'
import {
  ProviderCreation,
  ProviderListSchema,
  ProviderSchema,
  ProviderUpdating,
} from './Provider.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ProviderResolver {
  static provider = new Provider()

  @Query(() => [ProviderSchema])
  async providers(): Promise<ProviderListSchema[]> {
    const providers = await ProviderResolver.provider.readAll()
    if (!providers) return []

    return await Promise.all(
      Object.values(providers).map(async provider => {
        const user = (await ProviderResolver.provider.getUser(provider.id)) as UserSchema

        return {
          ...provider,
          user,
        }
      }),
    )
  }

  @Query(() => ProviderSchema || GraphQLError)
  async provider(@Arg('id') id: string): Promise<ProviderSchema | GraphQLError> {
    const provider = await ProviderResolver.provider.read(id)

    if (!provider) {
      return new GraphQLError(`Provider with id ${id} is not found`)
    }

    const user = await ProviderResolver.provider.getUser(id)

    if (user === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`A user of a provider with id ${id} was not found`)
    }

    const serviceResolver = new ServiceResolver()
    const service = await serviceResolver.service(provider.serviceId)

    if (service instanceof GraphQLError) {
      return new GraphQLError(`Not found service of provider with id ${id}`)
    }

    return {
      ...provider,
      user,
      service,
    }
  }

  @Mutation(() => String || GraphQLError)
  async createProvider(
    @Arg('providerInfo') providerInfo: ProviderCreation,
  ): Promise<GraphQLError | IProviderModel['id']> {
    const { status, id } = await ProviderResolver.provider.create(providerInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create provider")
  }

  @Mutation(() => Boolean)
  async deleteProvider(@Arg('providerId') providerId: string): Promise<boolean> {
    const status = await ProviderResolver.provider.delete(providerId)

    return status === EDbStatus.OK
  }

  @Mutation(() => ProviderSchema || false)
  async updateProvider(
    @Arg('id') id: string,
    @Arg('providerInfo') providerInfo: ProviderUpdating,
  ): Promise<ProviderSchema | false> {
    const provider = await ProviderResolver.provider.read(id)
    if (!provider) return false

    const status = await ProviderResolver.provider.update(id, providerInfo)
    const providerResolver = new ProviderResolver()
    const nextProvider = await providerResolver.provider(id)

    if (status !== EDbStatus.OK || nextProvider instanceof GraphQLError) {
      return false
    }

    return nextProvider
  }
}
