import { execute } from '../../../__generated'
import { bot } from '../../index'
import type { IPressProviderContext } from '../../types/context'
import { TEvent } from '../types'
import { FETCH_CLIENT, FETCH_PROVIDER } from './fetchers'
import { createOrderAndSendNextStepsToUser, sendOrderIfItIsExisted } from './helpers'

export const pressProviderEvent: TEvent<IPressProviderContext> = async (context, query) => {
  const receiver = query.from.id
  await bot.sendChatAction(receiver, 'typing')
  const providerResponse = await execute(FETCH_PROVIDER, { variables: { id: context.id } })
  const { provider } = providerResponse
  const clientResponse = await execute(FETCH_CLIENT, { variables: { telegramId: receiver } })
  const { client } = clientResponse
  // TODO заменить этот метот на FETCH_ORDER с обработкой ошибки
  const { isOrderExisted } = await sendOrderIfItIsExisted({
    receiver,
    provider,
    client,
  })

  if (!isOrderExisted) {
    await createOrderAndSendNextStepsToUser({ receiver, provider, client })
  }
}
