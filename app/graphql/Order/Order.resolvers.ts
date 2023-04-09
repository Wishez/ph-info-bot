import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Order } from '../../models/Order/Order'
import { IOrderModel } from '../../models/Order/types'
import { EServiceType } from '../../models/Service/types'
import { ClientResolver } from '../Client/Client.resolvers'
import { ClientSchema } from '../Client/Client.schema'
import { ProviderResolver } from '../Provider/Provider.resolvers'
import { ProviderSchema } from '../Provider/Provider.schema'
import { ServiceResolver } from '../Service/Service.resolvers'
import { ServiceSchema } from '../Service/Service.schema'
import {
  OrderAttributeUpdating,
  OrderCreation,
  OrderListSchema,
  OrderSchema,
  UpdatingOrder,
} from './Order.schema'

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
        const provider = (await OrderResolver.providerResolver.provider(
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
    const provider = await OrderResolver.providerResolver.provider(order.providerId)
    const service = await OrderResolver.serviceResolver.service(order.serviceId)
    const filledServicesAttributes = await OrderResolver.order.getFilledAttributes(order.id)
    const informationObject = await OrderResolver.order.getOrderInformationObject(order.id)

    if (
      client instanceof GraphQLError ||
      provider instanceof GraphQLError ||
      service instanceof GraphQLError
    ) {
      return new GraphQLError("Can't get client, provider, or service")
    }

    return {
      ...order,
      service,
      client,
      provider,
      informationObject: informationObject === EDbStatus.NOT_FOUND ? undefined : informationObject,
      filledServicesAttributes:
        filledServicesAttributes === EDbStatus.NOT_FOUND
          ? []
          : Object.values(filledServicesAttributes),
    }
  }

  @Mutation(() => String || GraphQLError)
  async createOrder(
    @Arg('orderInfo') orderInfo: OrderCreation,
  ): Promise<GraphQLError | IOrderModel['id']> {
    const { status, id, message } = await OrderResolver.order.create(orderInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError(`Can't create order: ${message}`)
  }

  @Mutation(() => OrderSchema || Boolean)
  async updateOrder(
    @Arg('id') id: string,
    @Arg('orderInfo') orderInfo: UpdatingOrder,
  ): Promise<boolean | OrderSchema> {
    const status = await OrderResolver.order.update(id, orderInfo)
    const orderResolver = new OrderResolver()
    const order = await orderResolver.order(id)

    if (status !== EDbStatus.OK || order instanceof GraphQLError) {
      return false
    }

    return order
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

  @Query(() => String, { nullable: true })
  async checkOrderExistence(
    @Arg('providerId') providerId: string,
    @Arg('clientId') clientId: string,
  ): Promise<string | undefined> {
    const orders = await this.orders()

    return orders.find(order => order.provider.id === providerId && order.client.id === clientId)
      ?.id
  }

  @Query(() => Boolean)
  async isAllRequiredAttributesFilled(@Arg('id') id: string): Promise<boolean> {
    const order = await this.order(id)

    if (order instanceof GraphQLError) return false

    switch (order.service.serviceType) {
      case EServiceType.PORTFOLIO:
        return Boolean(order.informationObject?.id)
      case EServiceType.FORM:
        return order.filledServicesAttributes.every(({ serviceAttribute, value }) =>
          serviceAttribute.isRequired ? Boolean(value) : true,
        )
      default:
        return false
    }
  }
}
