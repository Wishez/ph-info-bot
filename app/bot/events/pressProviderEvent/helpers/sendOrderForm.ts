import { execute } from '../../../../__generated'
import { filledServiceAttributeSchema$, mutation$ } from '../../../../__generated/fetchers'
import { IUserModel } from '../../../../models/User/types'
import { bot } from '../../../index'
import { TOrderFetcherModel } from '../fetchers/types'

const UPDATE_FILLED_ATTRIBUTE = mutation$.updateFilledServiceAttribute(
  filledServiceAttributeSchema$.id,
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
    await execute(UPDATE_FILLED_ATTRIBUTE, {
      variables: {
        id,
        filledServiceAttributeInfo: { replyMessageId: message.message_id },
      },
    })
  })
}
