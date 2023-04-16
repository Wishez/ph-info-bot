import { IConnectUserToOrderChatContext } from '../types/context'
import { connectUserToOrderChat } from './helpers'
import { TEvent } from './types'

export const connectUserToOrderChatEvent: TEvent<IConnectUserToOrderChatContext> = async (
  context,
  query,
) => {
  await connectUserToOrderChat({ orderId: context.id, userTelegramId: query.from.id })
}
