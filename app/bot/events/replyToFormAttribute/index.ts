import { execute } from '../../../__generated'
import {
  filledServiceAttributeListSchema$,
  filledServiceAttributeSchema$,
  mutation$,
  orderSchema$,
  query$,
  serviceAttributeSchema$,
  serviceSchema$,
  userSchema$,
} from '../../../__generated/fetchers'
import { IFilledServiceAttributeModel } from '../../../models/FilledServiceAttribute/types'
import { EOrderStatus, IOrderModel } from '../../../models/Order/types'
import { EServiceType } from '../../../models/Service/types'
import { withMessageErrorLogger } from '../../helpers/errors'
import { bot } from '../../index'
import { getCallProviderActionIfOrderFilled } from '../helpers'

const FETCH_USER = query$.user(
  userSchema$.orders(
    orderSchema$.status.id
      .filledServicesAttributes(filledServiceAttributeListSchema$.id.replyMessageIds)
      .service(serviceSchema$.serviceType),
  ),
)
const UPDATE_FILLED_ATTRIBUTE = mutation$.updateFilledServiceAttribute(
  filledServiceAttributeSchema$.serviceAttribute(serviceAttributeSchema$.name).value,
)

export const onReplyFilledAttribute = withMessageErrorLogger(
  'onReplyFilledAttribute',
  async message => {
    const userTelegramId = message.from?.id
    const replyMessageId = message.reply_to_message?.message_id
    if (!(replyMessageId && userTelegramId)) return
    await bot.sendChatAction(userTelegramId, 'typing')

    const userResponse = await execute(FETCH_USER, { variables: { telegramId: userTelegramId } })
    const { user } = userResponse

    let filledAttributeId: undefined | IFilledServiceAttributeModel['id']
    let orderId: undefined | IOrderModel['id']
    for (const order of user.orders || []) {
      if (
        order.status === EOrderStatus.IN_PROCESS &&
        order.service.serviceType === EServiceType.FORM
      ) {
        for (const filledAttribute of order.filledServicesAttributes || []) {
          if (filledAttribute.replyMessageIds?.includes(replyMessageId)) {
            filledAttributeId = filledAttribute.id
            orderId = order.id
            break
          }
        }

        if (filledAttributeId) break
      }
    }

    if (filledAttributeId && orderId) {
      const filledAttributeResponse = await execute(UPDATE_FILLED_ATTRIBUTE, {
        variables: { id: filledAttributeId, filledServiceAttributeInfo: { value: message.text } },
      })
      const filledAttribute = filledAttributeResponse.updateFilledServiceAttribute

      await bot.editMessageText(
        `${filledAttribute.serviceAttribute.name} — ${filledAttribute.value}`,
        {
          message_id: replyMessageId,
          chat_id: userTelegramId,
        },
      )

      const connectWithProviderButton = await getCallProviderActionIfOrderFilled({ orderId })

      if (connectWithProviderButton) {
        await bot.sendMessage(userTelegramId, 'Вы заполнили все необходимые поля', {
          reply_markup: {
            inline_keyboard: [[connectWithProviderButton]],
          },
        })
      }
    }
  },
)
