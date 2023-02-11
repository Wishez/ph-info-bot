import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { ServiceAttribute } from '../../models/ServiceAttribute/ServiceAttribute'
import { IServiceAttributeModel } from '../../models/ServiceAttribute/types'
import { ServiceResolver } from '../Service/Service.resolvers'
import {
  ServiceAttributeCreation,
  ServiceAttributeListSchema,
  ServiceAttributeSchema,
  ServiceAttributeUpdating,
} from './ServiceAttribute.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ServiceAttributeResolver {
  static serviceAttribute = new ServiceAttribute()
  static serviceResolver = new ServiceResolver()

  @Query(() => [ServiceAttributeListSchema])
  async serviceAttributes(): Promise<ServiceAttributeListSchema[]> {
    const serviceAttributes = await ServiceAttributeResolver.serviceAttribute.readAll()
    if (!serviceAttributes) return []

    return Object.values(serviceAttributes)
  }

  @Query(() => ServiceAttributeSchema || GraphQLError)
  async serviceAttribute(@Arg('id') id: string): Promise<ServiceAttributeSchema | GraphQLError> {
    const serviceAttribute = await ServiceAttributeResolver.serviceAttribute.read(id)

    if (!serviceAttribute) {
      return new GraphQLError(`Service Attribute with ${id} is not found`)
    }

    if (serviceAttribute.serviceId) {
      const service = await ServiceAttributeResolver.serviceResolver.service(
        serviceAttribute.serviceId,
      )

      if (service instanceof GraphQLError) {
        return new GraphQLError(
          `Attribute has service with id ${serviceAttribute.serviceId}, but service is out of data base`,
        )
      }

      return {
        ...serviceAttribute,
        service,
      }
    }

    return serviceAttribute
  }

  @Mutation(() => String || GraphQLError)
  async createServiceAttribute(
    @Arg('serviceAttributeInfo') serviceAttributeInfo: ServiceAttributeCreation,
  ): Promise<GraphQLError | IServiceAttributeModel['id']> {
    const { status, id } = await ServiceAttributeResolver.serviceAttribute.create(
      serviceAttributeInfo,
    )

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create service category")
  }

  @Mutation(() => Boolean)
  async deleteServiceAttribute(@Arg('id') id: string): Promise<boolean> {
    const status = await ServiceAttributeResolver.serviceAttribute.delete(id)

    return status === EDbStatus.OK
  }

  @Mutation(() => ServiceAttributeSchema || false)
  async updateServiceAttribute(
    @Arg('id') id: string,
    @Arg('serviceAttributeInfo') serviceAttributeInfo: ServiceAttributeUpdating,
  ): Promise<ServiceAttributeSchema | false> {
    const status = await ServiceAttributeResolver.serviceAttribute.update(id, serviceAttributeInfo)
    const nextServiceAttribute = await this.serviceAttribute(id)

    if (status !== EDbStatus.OK || nextServiceAttribute instanceof GraphQLError) {
      return false
    }

    return nextServiceAttribute
  }
}
