import { execute } from '../../../../__generated'
import { filledServiceAttributeSchema$, mutation$ } from '../../../../__generated/fetchers'
import { IUserModel } from '../../../../models/User/types'
import { bot } from '../../../index'
import { getCallProviderActionIfOrderFilled } from '../../helpers'
import { TOrderFetcherModel } from '../fetchers/types'

const UPDATE_ATTRIBUTE = mutation$.updateFilledServiceAttribute(
  filledServiceAttributeSchema$.value.id,
)

interface ISendOrderFormOptions {
  order: TOrderFetcherModel
  receiver: IUserModel['telegramId']
}

export const sendOrderForm = async (options: ISendOrderFormOptions) => {
  const { order, receiver } = options
  await bot.sendMessage(
    receiver,
    `
Некоторая информация мне обязательна, а какая-то по желанию🙂

Чтобы заполнить информацию, просто ответьте на сообщение

Повторным ответом, вы сможете отредактировать информацию
  `,
  )
  order.filledServicesAttributes.forEach(async ({ id, serviceAttribute, value }) => {
    const message = await bot.sendMessage(
      receiver,
      `
${serviceAttribute.name} — ${!value && serviceAttribute.isRequired ? 'Обязательно' : value}

${value ? '' : serviceAttribute.notice}
    `,
    )
    bot.onReplyToMessage(receiver, message.message_id, async replyedMessage => {
      const filledAttributeResponse = await execute(UPDATE_ATTRIBUTE, {
        variables: {
          filledServiceAttributeId: id,
          filledServiceAttributeInfo: { value: replyedMessage.text },
        },
      })
      const filledAttribute = filledAttributeResponse.updateFilledServiceAttribute

      await bot.editMessageText(`${serviceAttribute.name} — ${filledAttribute.value}`, {
        message_id: message.message_id,
        chat_id: message.chat.id,
      })

      const connectWithProviderButton = await getCallProviderActionIfOrderFilled({
        orderId: order.id,
      })

      if (connectWithProviderButton) {
        await bot.sendMessage(receiver, 'Вы заполнили все необходимые поля', {
          reply_markup: {
            inline_keyboard: [[connectWithProviderButton]],
          },
        })
      }
    })
  })
}
