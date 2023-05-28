import { format } from 'date-fns'
import { execute } from '../../../__generated'
import {
  clientSchema$,
  informationObjectListSchema$$,
  orderSchema$,
  providerSchema$,
  query$,
  serviceSchema$$,
  userSchema$$,
} from '../../../__generated/fetchers'
import { EOrderStatus } from '../../../models/Order/types'
import { CallbackButton } from '../../components'
import { withMessageErrorLogger } from '../../helpers/errors'
import { bot } from '../../index'
import { EOrderAction } from '../../types/actions'
import { ICancelOrderContext } from '../../types/context/order'
import { tryToCreateUser } from '../actions'

const FETCH_USER_ORDERS = query$.ordersByUser(
  orderSchema$.id.status.createdAt.number
    .client(clientSchema$.user(userSchema$$))
    .provider(providerSchema$.user(userSchema$$))
    .service(serviceSchema$$)
    .informationObject(informationObjectListSchema$$),
)
const orderStatusesThatIsNotInProcess = [
  EOrderStatus.CLOSED,
  EOrderStatus.COMPLETED,
  EOrderStatus.PAID,
]

export const onCancelOrderCommand = withMessageErrorLogger('onCancelOrderCommand', async msg => {
  const userTelegramId = msg.chat.id
  await bot.sendChatAction(userTelegramId, 'typing')
  const userFromChat = msg.from
  if (userFromChat) await tryToCreateUser(userFromChat)

  const { ordersByUser } = await execute(FETCH_USER_ORDERS, {
    variables: { payload: { userTelegramId } },
  })

  ordersByUser
    .filter(({ status }) => !orderStatusesThatIsNotInProcess.includes(status as EOrderStatus))
    .forEach(order => {
      bot.sendMessage(
        userTelegramId,
        `
Заказ № ${order.number} от ${format(new Date(order.createdAt), 'dd LLLL yyyy')}

Тема: ${order.service.name}
Клиент: ${order.client.user.name}
Оператор: ${order.provider.user.name}
${order.informationObject ? `Объект: ${order.informationObject?.name}` : ''}
              `,
        {
          reply_markup: {
            inline_keyboard: [
              [
                CallbackButton<ICancelOrderContext>('Отменить', {
                  orderId: order.id,
                  action: EOrderAction.CANCEL_ORDER,
                }),
              ],
            ],
          },
        },
      )
    })
})
