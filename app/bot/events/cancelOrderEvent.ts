import TelegramBot from 'node-telegram-bot-api'
import { execute } from '../../__generated'
import {
  clientSchema$,
  mutation$,
  orderSchema$,
  orderSchema$$,
  providerSchema$,
  query$,
  userSchema$$,
} from '../../__generated/fetchers'
import { bot } from '../index'
import { ICancelOrderContext } from '../types/context/order'

const CANCEL_ORDER = mutation$.cancelOrder(orderSchema$$)
const FETCH_ORDER = query$.order(
  orderSchema$.number
    .provider(providerSchema$.user(userSchema$$))
    .client(clientSchema$.user(userSchema$$)),
)

export const cancelOrderEvent = async (
  context: ICancelOrderContext,
  query: TelegramBot.CallbackQuery,
) => {
  const userChatId = query.from?.id
  await bot.sendChatAction(userChatId, 'typing')
  const { order } = await execute(FETCH_ORDER, { variables: { id: context.orderId } })

  const { message_id } = await bot.sendMessage(
    userChatId,
    `Пожалуйста, напишите причину отмены заказа № ${order.number} ответом на это сообщение🙏🏽`,
  )
  const replyListenerId = bot.onReplyToMessage(userChatId, message_id, async replyMessage => {
    const cancelingReason = replyMessage.text

    if (cancelingReason) {
      bot.sendChatAction(userChatId, 'typing')
      await execute(CANCEL_ORDER, {
        variables: {
          id: context.orderId,
          cancelingReason,
        },
      })
      bot.removeReplyListener(replyListenerId)
      bot.editMessageText(
        `
Записал: «${cancelingReason}»

Заказ № ${order.number} отменён! Спасибо за обратную связь😊
      `,
        {
          message_id,
          chat_id: userChatId,
        },
      )
      const isProvider = userChatId === order.provider.user.telegramId

      bot.sendMessage(
        isProvider ? order.client.user.telegramId : order.provider.user.telegramId,
        `
Заказ № ${order.number} отменён ${
          isProvider ? 'оператором' : 'клиентом'
        } по причине «${cancelingReason}»🤷️
      `,
      )
    }
  })
}
