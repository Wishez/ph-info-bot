import { execute } from '../../__generated'
import {
  chatSchema$,
  clientSchema$,
  providerSchema$,
  query$,
  userSchema$$,
} from '../../__generated/fetchers'
import { bot } from '../index'

const FETCH_CHAT = query$.chat(
  chatSchema$.provider(providerSchema$.user(userSchema$$)).client(clientSchema$.user(userSchema$$)),
)
const FETCH_USER = query$.user(userSchema$$)

export const useForwardingMessages = () => {
  bot.on('message', async msg => {
    // ID пользователя, которому нужно переслать сообщение
    const userTelegramId = msg.from?.id
    if (!userTelegramId) return

    const userResponse = await execute(FETCH_USER, { variables: { telegramId: userTelegramId } })
    const { user } = userResponse
    const { currentChatId } = user
    if (!currentChatId) return

    const chatResponse = await execute(FETCH_CHAT, { variables: { id: currentChatId } })
    const { chat } = chatResponse

    let opponentTelegramId = chat.client.user.telegramId
    if (chat.client.user.telegramId === userTelegramId) {
      opponentTelegramId = chat.provider.user.telegramId
    }

    if (msg.photo) {
      await bot.copyMessage(opponentTelegramId, userTelegramId, msg.message_id, {
        caption: `От «**${user.name}**»`,
        parse_mode: 'Markdown',
      })
    } else if (msg.text) {
      await bot.sendMessage(
        opponentTelegramId,
        `
От «**${user.name}**»

**Сообщение:**
${msg.text}
        `,
        {
          parse_mode: 'Markdown',
        },
      )
    }
  })
}
