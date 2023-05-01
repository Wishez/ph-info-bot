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
import { tryToCreateUser } from '../start/actions'

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
    const userFromChat = msg.from
    if (userFromChat) await tryToCreateUser(userFromChat)
    const userResponse = await execute(FETCH_USER, { variables: { telegramId: userTelegramId } })
    const { user } = userResponse

    if (user.orders?.length) {
      user.orders.forEach(order => {
        let opponentName = order.provider.user.name
        if (order.provider.user.id === user.id) {
          opponentName = order.client.user.name
        }
        bot.sendMessage(userTelegramId, `${order.service.name} — ${opponentName}`, {
          reply_markup: {
            inline_keyboard: [
              [
                CallbackButton<IConnectUserToOrderChatContext>('Войти в чат🦧', {
                  id: order.id,
                  action: ECommonAction.CONNECT_USER_TO_ORDER_CHAT,
                }),
              ],
            ],
          },
        })
      })
    } else {
      bot.sendMessage(userTelegramId, 'У вас пока нет чатов🤷')
    }
  })
}
