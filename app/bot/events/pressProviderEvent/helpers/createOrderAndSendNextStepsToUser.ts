import { execute } from '../../../../__generated'
import { mutation$ } from '../../../../__generated/fetchers'
import { IUserModel } from '../../../../models/User/types'
import { bot } from '../../../index'
import { FETCH_ORDER } from '../fetchers'
import { TClientFetcherModel, TProviderFetcherModel } from '../fetchers/types'
import { sendInfoToUserDependsOnServiceType } from './sendInfoToUserDependsOnServiceType'

const CREATE_ORDER = mutation$.createOrder()
interface ICreateOrderAndSendToUserOptions {
  provider: TProviderFetcherModel
  client: TClientFetcherModel
  receiver: IUserModel['telegramId']
}

export const createOrderAndSendNextStepsToUser = async (
  options: ICreateOrderAndSendToUserOptions,
) => {
  const { client, provider, receiver } = options
  await bot.sendMessage(
    receiver,
    'В несколько шагов, мы с вами заполним заявку, я расскажу оператору о вашем желание и свяжу вас с ним',
  )
  await bot.sendChatAction(receiver, 'typing')

  const creationOrderResponse = await execute(CREATE_ORDER, {
    variables: {
      orderInfo: {
        providerId: provider.id,
        clientId: client.id,
        serviceId: provider.service.id,
      },
    },
  })
  const orderId = creationOrderResponse.createOrder
  const orderResponse = await execute(FETCH_ORDER, { variables: { id: orderId } })

  await sendInfoToUserDependsOnServiceType({
    receiver,
    order: orderResponse.order,
    provider,
  })
}
