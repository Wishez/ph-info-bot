import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Provider } from '../../models/Provider/Provider'
import { Service } from '../../models/Service/Service'
import type { IServiceModel } from '../../models/Service/types'
import { ServiceCategoryResolver } from '../ServiceCategory/ServiceCategory.resolvers'
import {
  ServiceBindingAttributes,
  ServiceBindingCategory,
  ServiceCreation,
  ServiceDeletingAttributes,
  ServiceListSchema,
  ServiceSchema,
  ServiceUpdating,
} from './Service.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ServiceResolver {
  static service = new Service()
  static provider = new Provider()

  @Query(() => [ServiceListSchema])
  async services(): Promise<ServiceListSchema[]> {
    const services = await ServiceResolver.service.readAll()
    if (!services) return []

    return Object.values(services)
  }

  @Query(() => ServiceSchema || GraphQLError)
  async service(@Arg('id') id: string): Promise<ServiceSchema | GraphQLError> {
    const service = await ServiceResolver.service.read(id)

    if (!service) {
      return new GraphQLError(`Service with ${id} is not found`)
    }

    const categoryResolver = new ServiceCategoryResolver()
    const category = await categoryResolver.serviceCategory(service.categoryId)
    const attributes = await ServiceResolver.service.getServiceAttributes(id)
    const providers = await ServiceResolver.provider.readAll()
    const users = await ServiceResolver.provider.user.readAll()

    if (category instanceof GraphQLError) {
      return new GraphQLError(`Can't get category of service with id ${id}`)
    }

    return {
      ...service,
      providers: !(providers && users)
        ? []
        : service.providersIds.map(providerId => {
            const provider = providers[providerId]!

            return { ...provider, user: users[provider.userId]! }
          }),
      category,
      attributes: attributes === EDbStatus.NOT_FOUND ? [] : Object.values(attributes),
    }
  }

  @Mutation(() => String || GraphQLError)
  async createService(
    @Arg('serviceInfo') serviceInfo: ServiceCreation,
  ): Promise<GraphQLError | IServiceModel['id']> {
    const { status, id } = await ServiceResolver.service.create({
      ...serviceInfo,
      providersIds: [],
      attributesIds: [],
    })

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create service category")
  }

  @Mutation(() => Boolean)
  async deleteService(@Arg('id') id: string): Promise<boolean> {
    const status = await ServiceResolver.service.delete(id)

    return status === EDbStatus.OK
  }

  @Mutation(() => ServiceSchema || false)
  async updateService(
    @Arg('id') id: string,
    @Arg('serviceInfo') serviceInfo: ServiceUpdating,
  ): Promise<ServiceSchema | false> {
    const status = await ServiceResolver.service.update(id, serviceInfo)
    const nextService = await this.service(id)

    if (status !== EDbStatus.OK || nextService instanceof GraphQLError) {
      return false
    }

    return nextService
  }

  @Mutation(() => ServiceSchema || false)
  async bindCategoryToService(
    @Arg('id') id: string,
    @Arg('serviceInfo') serviceInfo: ServiceBindingCategory,
  ): Promise<ServiceSchema | false> {
    const service = await ServiceResolver.service.read(id)
    if (!service) return false

    const status = await ServiceResolver.service.bindServiceCategory(id, serviceInfo.categoryId)
    const nextService = await this.service(id)

    if (status !== EDbStatus.OK || nextService instanceof GraphQLError) {
      return false
    }

    return nextService
  }

  @Mutation(() => ServiceSchema || false)
  async bindAttributesToService(
    @Arg('id') id: string,
    @Arg('serviceInfo') serviceInfo: ServiceBindingAttributes,
  ): Promise<ServiceSchema | false> {
    const service = await ServiceResolver.service.read(id)
    if (!service) return false

    const status = await ServiceResolver.service.bindServiceAttributes(
      id,
      serviceInfo.attributesIds,
    )
    const nextService = await this.service(id)

    if (status !== EDbStatus.OK || nextService instanceof GraphQLError) {
      return false
    }

    return nextService
  }

  @Mutation(() => ServiceSchema || false)
  async deleteAttributesFromService(
    @Arg('id') id: string,
    @Arg('serviceInfo') serviceInfo: ServiceDeletingAttributes,
  ): Promise<ServiceSchema | false> {
    const service = await ServiceResolver.service.read(id)
    if (!service) return false

    const isDeleted = await ServiceResolver.service.deleteServiceAttributes(
      id,
      serviceInfo.attributesIds,
    )
    const nextService = await this.service(id)

    if (!isDeleted || nextService instanceof GraphQLError) {
      return false
    }

    return nextService
  }
}
