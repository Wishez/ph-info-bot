import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Chat } from '../Chat/Chat'
import { IChatModel } from '../Chat/types'
import { Order } from '../Order/Order'
import { IOrderModel } from '../Order/types'
import { Provider } from '../Provider/Provider'
import { IProviderModel } from '../Provider/types'
import { IUserModel } from './types'

export class User extends CrudOperations<IUserModel> {
  get chat() {
    return new Chat()
  }

  get provider() {
    return new Provider()
  }

  get order() {
    return new Order()
  }

  constructor() {
    super({ namespace: 'bot', modelName: 'user' })
  }

  getUserByTelegramId = async (telegramId: IUserModel['telegramId']) => {
    const models = await this.readAll()
    if (!models) return

    return Object.values(models).find(model => model.telegramId === telegramId)
  }

  connectToChat = async (id: IUserModel['id'], chatId: IChatModel['id']) => {
    const chat = await this.chat.read(chatId)
    const user = await this.read(id)
    if (!(chat && user)) return EDbStatus.NOT_FOUND

    return await this.update(id, { currentChatId: chatId })
  }

  leaveChat = async (id: IUserModel['id']) => {
    return await this.update(id, { currentChatId: undefined })
  }

  addOrder = async (id: IUserModel['id'], orderId: IOrderModel['id']) => {
    const user = await this.read(id)
    const order = await this.order.read(orderId)
    if (!user || !order) return EDbStatus.NOT_FOUND

    return await this.update(id, {
      ordersIds: uniq([...(user.ordersIds || []), orderId]),
    })
  }

  getUserProviders = async (
    id: IUserModel['id'],
  ): Promise<EDbStatus.NOT_FOUND | Record<IProviderModel['id'], IProviderModel>> => {
    const user = await this.read(id)
    if (!user) return EDbStatus.NOT_FOUND

    const providers = await this.provider.readAll()
    if (!providers) return EDbStatus.NOT_FOUND

    return pick(providers, user.providersIds || [])
  }

  getUserOrders = async (
    id: IUserModel['id'],
  ): Promise<EDbStatus.NOT_FOUND | Record<IOrderModel['id'], IOrderModel>> => {
    const user = await this.read(id)
    if (!user) return EDbStatus.NOT_FOUND

    const orders = await this.order.readAll()
    if (!orders) return EDbStatus.NOT_FOUND

    return pick(orders, user.ordersIds || [])
  }
}
