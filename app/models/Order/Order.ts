import map from 'lodash/map'
import uniq from 'lodash/uniq'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Chat } from '../Chat/Chat'
import { Client } from '../Client/Client'
import { FilledServiceAttribute } from '../FilledServiceAttribute/FilledServiceAttribute'
import { IFilledServiceAttributeModel } from '../FilledServiceAttribute/types'
import { Provider } from '../Provider/Provider'
import { IProviderModel } from '../Provider/types'
import { Service } from '../Service/Service'
import { IUserModel } from '../User/types'
import { EOrderStatus, IOrderModel } from './types'

export class Order extends CrudOperations<IOrderModel> {
  client = new Client()
  provider = new Provider()
  service = new Service()
  filledServicesAttribute = new FilledServiceAttribute()
  chat = new Chat()

  constructor() {
    super({ namespace: 'bot', modelName: 'order' })
  }

  getClient = async (id: IOrderModel['id']) => {
    const order = await this.read(id)
    if (!order) return EDbStatus.NOT_FOUND

    const client = await this.client.read(order.clientId)
    if (!client) return EDbStatus.NOT_FOUND

    return client
  }

  getProvider = async (id: IOrderModel['id']) => {
    const order = await this.read(id)
    if (!order) return EDbStatus.NOT_FOUND

    const provider = await this.provider.read(order.providerId)
    if (!provider) return EDbStatus.NOT_FOUND

    return provider
  }

  getService = async (id: IOrderModel['id']) => {
    const order = await this.read(id)
    if (!order) return EDbStatus.NOT_FOUND

    const service = await this.service.read(order.serviceId)
    if (!service) return EDbStatus.NOT_FOUND

    return service
  }

  getFilledAttributes = async (id: IOrderModel['id']) => {
    const order = await this.read(id)
    if (!order) return EDbStatus.NOT_FOUND

    const filledAttributes = await this.filledServicesAttribute.getFilledAttributesByIds(
      order.filledServicesAttributesIds,
    )
    if (!filledAttributes) return EDbStatus.NOT_FOUND

    return filledAttributes
  }

  private bindFilledAttributes = async (
    id: IOrderModel['id'],
    filledAttributesIds: IFilledServiceAttributeModel['id'][],
  ) => {
    const order = await this.read(id)
    if (!order) return EDbStatus.NOT_FOUND

    const filledAttributes = await this.filledServicesAttribute.readAll()
    if (!filledAttributes) return EDbStatus.NOT_FOUND

    const isSomeFilledAttributeNotExisted = filledAttributesIds.some(
      filledAttributeId => !filledAttributes[filledAttributeId],
    )

    if (isSomeFilledAttributeNotExisted) return EDbStatus.NOT_FOUND

    return await this.update(id, {
      filledServicesAttributesIds: uniq([
        ...filledAttributesIds,
        ...order.filledServicesAttributesIds,
      ]),
    })
  }

  updateAttribute = async (
    orderId: IOrderModel['id'],
    attributeId: IFilledServiceAttributeModel['id'],
    attributeValue: IFilledServiceAttributeModel['value'],
  ) => {
    const order = await this.read(orderId)
    if (!order) return EDbStatus.NOT_FOUND

    if (!order.filledServicesAttributesIds.includes(attributeId)) return EDbStatus.ERROR

    return await this.filledServicesAttribute.update(attributeId, { value: attributeValue })
  }

  create = async (
    model: Omit<
      IOrderModel,
      'id' | 'createdAt' | 'updatedAt' | 'status' | 'filledServicesAttributesIds' | 'chatId'
    >,
  ) => {
    const { clientId, providerId, serviceId } = model
    const client = await this.client.read(clientId)
    const clientUser = await this.client.getUser(clientId)
    const provider = await this.provider.read(providerId)
    const service = await this.service.read(serviceId)

    if (!(client && provider && service) || clientUser === EDbStatus.NOT_FOUND) {
      return {
        id: '',
        status: EDbStatus.ERROR,
        message: 'Bad clientId, providerId, chatId, or serviceId',
      }
    }

    const chat = await this.chat.create({
      clientTelegramId: clientUser.telegramId,
      providerId: provider.id,
    })

    const orderCreationState = await super.create({
      ...model,
      chatId: chat.id,
      filledServicesAttributesIds: [],
      status: EOrderStatus.IN_PROCESS,
    })

    if (orderCreationState.status !== EDbStatus.OK) {
      return {
        ...orderCreationState,
        message: 'Order creation is failed',
      }
    }

    // Если аттрибутов нет, то создаём заказ
    if (!service.attributesIds.length) {
      return { ...orderCreationState, message: null }
    }

    // Далее, создание аттрибутов по шаблону
    const filledAttributesCreationStates = await Promise.all(
      service.attributesIds.map(serviceAttributeId =>
        this.filledServicesAttribute.create({
          value: '',
          orderId: orderCreationState.id,
          serviceAttributeId,
        }),
      ),
    )

    const bindingAttributesStatus = await this.bindFilledAttributes(
      orderCreationState.id,
      map(filledAttributesCreationStates, 'id'),
    )

    if (bindingAttributesStatus !== EDbStatus.OK) {
      filledAttributesCreationStates.forEach(({ id }) => {
        this.filledServicesAttribute.delete(id)
      })
      this.delete(orderCreationState.id)

      return {
        id: orderCreationState.id,
        status: EDbStatus.ERROR,
        message: "Can't bind some attributes for filling",
      }
    }

    return {
      ...orderCreationState,
      message: null,
    }
  }

  completeOrder = async (id: IOrderModel['id']) => {
    return await this.update(id, { status: EOrderStatus.COMPLETED })
  }

  cancelOrder = async (id: IOrderModel['id']) => {
    return await this.update(id, { status: EOrderStatus.CLOSED })
  }

  getOrdersByUserTelegramId = async (
    telegramId: IUserModel['telegramId'],
  ): Promise<EDbStatus.NOT_FOUND | IOrderModel[]> => {
    const user = await this.client.user.getUserByTelegramId(telegramId)
    if (!user) return EDbStatus.NOT_FOUND

    const client = await this.client.getClientByUserTelegramId(telegramId)
    const providers = await this.provider.getProvidersByUserTelegramId(telegramId)
    const orders = await this.readAll()
    if (!orders) return EDbStatus.NOT_FOUND

    if (providers !== EDbStatus.NOT_FOUND) {
      const providersMap = Object.values(providers).reduce(
        (result: Record<IProviderModel['id'], true>, provider) => {
          result[provider.id] = true

          return result
        },
        {},
      )

      return Object.values(orders).filter(({ providerId }) => providersMap[providerId])
    }

    if (client !== EDbStatus.NOT_FOUND) {
      return Object.values(orders).filter(({ clientId }) => clientId === client.id)
    }

    return EDbStatus.NOT_FOUND
  }
}
