import { execute } from '../../../__generated'
import { mutation$, query$, userSchema$ } from '../../../__generated/fetchers'
import { bot } from '../../index'

const DISCONNECT_FROM_CHAT = mutation$.disconnectUserFromChat()
const FETCH_USER = query$.user(userSchema$.id)

export const useLeaveChatCommand = () => {
  bot.onText(/\/leave_chat/, async msg => {
    const userTelegramId = msg.chat.id
    await bot.sendChatAction(userTelegramId, 'typing')
    const userResponse = await execute(FETCH_USER, { variables: { telegramId: userTelegramId } })
    const { user } = userResponse
    const disconnectionResponse = await execute(DISCONNECT_FROM_CHAT, {
      variables: { userId: user.id },
    })
    await bot.sendMessage(
      userTelegramId,
      disconnectionResponse.disconnectUserFromChat
        ? 'Я отключил вас от чата😎'
        : 'Не удалось отключить вас от чата🤔 Попробуйте ещё раз',
    )
  })
}
