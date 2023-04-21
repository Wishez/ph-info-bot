import { InlineKeyboardButton } from 'node-telegram-bot-api'
import { execute } from '../../../__generated'
import {
  clientSchema$,
  orderSchema$,
  providerSchema$,
  query$,
  serviceSchema$,
  userSchema$,
} from '../../../__generated/fetchers'
import { CallbackButton } from '../../components'
import { bot } from '../../index'
import { ECommonAction } from '../../types/actions'
import { IConnectUserToOrderChatContext } from '../../types/context'

// const DISCONNECT_FROM_CHAT = mutation$.disconnectUserFromChat()
const FETCH_USER = query$.user(
  userSchema$.id.orders(
    orderSchema$.id
      .provider(providerSchema$.user(userSchema$.id.name))
      .service(serviceSchema$.name)
      .client(clientSchema$.user(userSchema$.id.name)),
  ),
)

export const useChooseChatCommand = () => {
  bot.onText(/\/choose_chat/, async msg => {
    const userTelegramId = msg.chat.id
    await bot.sendChatAction(userTelegramId, 'typing')
    const userResponse = await execute(FETCH_USER, { variables: { telegramId: userTelegramId } })
    const { user } = userResponse

    if (user.orders?.length) {
      const buttons: InlineKeyboardButton[][] =
        user.orders.map(order => {
          let opponentName = order.provider.user.name
          if (order.provider.user.id === user.id) {
            opponentName = order.client.user.name
          }

          return [
            CallbackButton<IConnectUserToOrderChatContext>(
              `${order.service.name} — ${opponentName}`,
              {
                id: order.id,
                action: ECommonAction.CONNECT_USER_TO_ORDER_CHAT,
              },
            ),
          ]
        }) || []
      bot.sendMessage(userTelegramId, 'Выберите чат🦧', {
        reply_markup: {
          inline_keyboard: buttons,
        },
      })
    } else {
      bot.sendMessage(userTelegramId, 'У вас пока нет чатов🤷')
    }
  })
}
