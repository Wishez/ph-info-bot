import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Provider } from '../../models/Provider/Provider'
import { IProviderModel } from '../../models/Provider/types'
import { UserSchema } from '../User/User.schema'
import {
  BindingProviderServices,
  ProviderCreation,
  ProviderListSchema,
  ProviderSchema,
  ProviderUpdating,
  UnmountingProviderServices,
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
  async provider(@Arg('telegramId') telegramId: string): Promise<ProviderSchema | GraphQLError> {
    const provider = await ProviderResolver.provider.getProviderByUserTelegramId(telegramId)

    if (provider === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`Provider with ${telegramId} is not found`)
    }

    const user = await ProviderResolver.provider.getUser(provider.id)

    if (user === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`User with ${telegramId} is not found`)
    }

    const services = await ProviderResolver.provider.getProvidedServices(provider.id)

    if (services === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`Not found services for provider`)
    }

    return {
      ...provider,
      user,
      services: Object.values(services),
    }
  }

  @Query(() => ProviderSchema || GraphQLError)
  async providerById(@Arg('id') id: string): Promise<ProviderSchema | GraphQLError> {
    const provider = await ProviderResolver.provider.read(id)

    if (!provider) {
      return new GraphQLError(`Provider with id ${id} is not found`)
    }

    const user = await ProviderResolver.provider.getUser(provider.id)

    if (user === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`User with ${id} is not found`)
    }

    const services = await ProviderResolver.provider.getProvidedServices(provider.id)

    if (services === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`Not found services for provider`)
    }

    return {
      ...provider,
      user,
      services: Object.values(services),
    }
  }

  @Mutation(() => String || GraphQLError)
  async createProvider(
    @Arg('providerInfo') providerInfo: ProviderCreation,
  ): Promise<GraphQLError | IProviderModel['id']> {
    const { status, id } = await ProviderResolver.provider.create({
      ...providerInfo,
      servicesIds: [],
    })

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
    @Arg('telegramId') telegramId: string,
    @Arg('providerInfo') providerInfo: ProviderUpdating,
  ): Promise<ProviderSchema | false> {
    const provider = await ProviderResolver.provider.getProviderByUserTelegramId(telegramId)
    if (provider === EDbStatus.NOT_FOUND) return false

    const status = await ProviderResolver.provider.update(provider.id, providerInfo)
    const providerResolver = new ProviderResolver()
    const nextProvider = await providerResolver.provider(telegramId)

    if (status !== EDbStatus.OK || nextProvider instanceof GraphQLError) {
      return false
    }

    return nextProvider
  }

  @Mutation(() => ProviderSchema || false)
  async bindProviderServices(
    @Arg('providerId') providerId: string,
    @Arg('providerInfo') providerInfo: BindingProviderServices,
  ): Promise<ProviderSchema | false> {
    const status = await ProviderResolver.provider.bindServices(
      providerId,
      providerInfo.servicesIds,
    )
    const user = await ProviderResolver.provider.getUser(providerId)
    if (user === EDbStatus.NOT_FOUND || status !== EDbStatus.OK) return false

    const providerResolver = new ProviderResolver()
    const nextProvider = await providerResolver.provider(user.telegramId)
    if (nextProvider instanceof GraphQLError) return false

    return nextProvider
  }

  @Mutation(() => ProviderSchema || false)
  async unmountProviderServices(
    @Arg('providerId') providerId: string,
    @Arg('providerInfo') providerInfo: UnmountingProviderServices,
  ): Promise<ProviderSchema | false> {
    const status = await ProviderResolver.provider.unmountServices(
      providerId,
      providerInfo.servicesIds,
    )
    const user = await ProviderResolver.provider.getUser(providerId)
    if (user === EDbStatus.NOT_FOUND || status !== EDbStatus.OK) return false

    const providerResolver = new ProviderResolver()
    const nextProvider = await providerResolver.provider(user.telegramId)

    if (nextProvider instanceof GraphQLError) return false

    return nextProvider
  }
}
