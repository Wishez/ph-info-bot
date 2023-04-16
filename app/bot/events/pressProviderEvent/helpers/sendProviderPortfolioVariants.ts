import { IUserModel } from '../../../../models/User/types'
import { CallbackButton } from '../../../components'
import { bot } from '../../../index'
import { ECommonAction } from '../../../types/actions'
import { IPressInformationObjectContext } from '../../../types/context'
import { sendInformationObject } from '../../helpers'
import { TOrderFetcherModel, TProviderFetcherModel } from '../fetchers/types'

interface IOptions {
  order: TOrderFetcherModel
  provider: TProviderFetcherModel
  receiver: IUserModel['telegramId']
}

export const sendProviderPortfolioVariants = async (options: IOptions) => {
  const { provider, receiver } = options
  await bot.sendChatAction(receiver, 'typing')
  provider.informationObjects?.forEach(async informationObject => {
    await sendInformationObject<IPressInformationObjectContext>({
      userTelegramId: receiver,
      informationObject,
      button: CallbackButton<IPressInformationObjectContext>('Выбрать', {
        id: informationObject.id,
        action: ECommonAction.PRESS_INFORMATION_OBJECT,
      }),
    })
  })
}
