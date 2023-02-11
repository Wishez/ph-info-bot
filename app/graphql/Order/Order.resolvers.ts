import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Order } from '../../models/Order/Order'
import { IOrderModel } from '../../models/Order/types'
import { ClientResolver } from '../Client/Client.resolvers'
import { ClientSchema } from '../Client/Client.schema'
import { ProviderResolver } from '../Provider/Provider.resolvers'
import { ProviderSchema } from '../Provider/Provider.schema'
import { ServiceResolver } from '../Service/Service.resolvers'
import { ServiceSchema } from '../Service/Service.schema'
import { OrderAttributeUpdating, OrderCreation, OrderListSchema, OrderSchema } from './Order.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

/*
 * orders
 * userOrders
 * order
 * completeOrder
 * cancelOrder
 * updateAttribute
 */
@Resolver()
export class OrderResolver {
  static order = new Order()
  static clientResolver = new ClientResolver()
  static providerResolver = new ProviderResolver()
  static serviceResolver = new ServiceResolver()

  @Query(() => [OrderListSchema])
  async orders(): Promise<OrderListSchema[]> {
    const orders = await OrderResolver.order.readAll()
    if (!orders) return []

    return await Promise.all(
      Object.values(orders).map(async order => {
        const client = (await OrderResolver.clientResolver.clientById(
          order.clientId,
        )) as ClientSchema
        const provider = (await OrderResolver.providerResolver.providerById(
          order.providerId,
        )) as ProviderSchema
        const service = (await OrderResolver.serviceResolver.service(
          order.serviceId,
        )) as ServiceSchema

        return {
          ...order,
          client,
          provider,
          service,
        }
      }),
    )
  }

  @Query(() => OrderSchema || GraphQLError)
  async order(@Arg('id') id: string): Promise<OrderSchema | GraphQLError> {
    const order = await OrderResolver.order.read(id)

    if (!order) {
      return new GraphQLError(`Order with ${id} is not found`)
    }

    const client = await OrderResolver.clientResolver.clientById(order.clientId)
    const provider = await OrderResolver.providerResolver.providerById(order.providerId)
    const service = await OrderResolver.serviceResolver.service(order.serviceId)
    const filledServicesAttributes = await OrderResolver.order.getFilledAttributes(order.id)

    if (
      client instanceof GraphQLError ||
      provider instanceof GraphQLError ||
      service instanceof GraphQLError ||
      filledServicesAttributes === EDbStatus.NOT_FOUND
    ) {
      return new GraphQLError("Can't get client, provider, service, or filled attributes")
    }

    return {
      ...order,
      service,
      client,
      provider,
      filledServicesAttributes: Object.values(filledServicesAttributes),
    }
  }

  @Mutation(() => String || GraphQLError)
  async createOrder(
    @Arg('orderInfo') orderInfo: OrderCreation,
  ): Promise<GraphQLError | IOrderModel['id']> {
    const { status, id } = await OrderResolver.order.create(orderInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create order")
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg('id') id: string): Promise<boolean> {
    const status = await OrderResolver.order.delete(id)

    return status === EDbStatus.OK
  }

  @Mutation(() => OrderSchema || false)
  async updateOrderAttribute(
    @Arg('id') id: string,
    @Arg('orderInfo') orderInfo: OrderAttributeUpdating,
  ): Promise<OrderSchema | false> {
    const status = await OrderResolver.order.updateAttribute(
      id,
      orderInfo.attributeId,
      orderInfo.value,
    )
    const nextOrder = await this.order(id)

    if (status !== EDbStatus.OK || nextOrder instanceof GraphQLError) {
      return false
    }

    return nextOrder
  }

  @Mutation(() => OrderSchema || false)
  async cancelOrder(@Arg('id') id: string): Promise<OrderSchema | false> {
    const status = await OrderResolver.order.cancelOrder(id)
    const nextOrder = await this.order(id)

    if (status !== EDbStatus.OK || nextOrder instanceof GraphQLError) {
      return false
    }

    return nextOrder
  }

  @Mutation(() => OrderSchema || false)
  async completeOrder(@Arg('id') id: string): Promise<OrderSchema | false> {
    const status = await OrderResolver.order.completeOrder(id)
    const nextOrder = await this.order(id)

    if (status !== EDbStatus.OK || nextOrder instanceof GraphQLError) {
      return false
    }

    return nextOrder
  }
}
