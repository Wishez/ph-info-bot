import { execute } from '../../../../__generated'
import { filledServiceAttributeSchema$, mutation$ } from '../../../../__generated/fetchers'
import { IUserModel } from '../../../../models/User/types'
import { CallbackButton } from '../../../components'
import { bot } from '../../../index'
import { ECommonAction } from '../../../types/actions'
import { IChooseAttributeValueContext } from '../../../types/context'
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

Чтобы заполнить информацию, выберите вариант ответа либо ответьте на сообщение

Повторным ответом или выбором варианта, вы сможете отредактировать информацию
  `,
  )
  order.filledServicesAttributes.forEach(async ({ id, serviceAttribute, value }) => {
    const message = await bot.sendMessage(
      receiver,
      `
${serviceAttribute.name} — ${!value && serviceAttribute.isRequired ? 'Обязательно' : value}

${serviceAttribute.notice}
    `,
      {
        reply_markup: {
          inline_keyboard:
            serviceAttribute.options?.map(option => [
              CallbackButton<IChooseAttributeValueContext>(option, {
                action: ECommonAction.CHOOSE_ATTRIBUTE_VALUE,
                value: option,
                filledAttributeId: id,
              }),
            ]) ?? [],
        },
      },
    )
    await execute(UPDATE_FILLED_ATTRIBUTE, {
      variables: {
        id,
        filledServiceAttributeInfo: { replyMessageId: message.message_id },
      },
    })
  })
}
