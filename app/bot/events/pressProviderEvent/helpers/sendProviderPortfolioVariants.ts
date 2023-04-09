import { IUserModel } from '../../../../models/User/types'
import { CallbackButton } from '../../../components'
import { bot } from '../../../index'
import { ECommonAction } from '../../../types/actions'
import { IPressInformationObjectContext } from '../../../types/context'
import { TOrderFetcherModel, TProviderFetcherModel } from '../fetchers/types'

interface IOptions {
  order: TOrderFetcherModel
  provider: TProviderFetcherModel
  receiver: IUserModel['telegramId']
}

export const sendProviderPortfolioVariants = async (options: IOptions) => {
  const { provider, receiver } = options
  await bot.sendChatAction(receiver, 'typing')
  provider.informationObjects?.forEach(async ({ id, name, description, gallery }) => {
    await bot.sendMediaGroup(
      receiver,
      gallery.map(({ url }) => ({ media: url, type: 'photo' })),
    )

    await bot.sendMessage(
      receiver,
      `
${name}

${description}
    `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              CallbackButton<IPressInformationObjectContext>('Выбрать', {
                id,
                action: ECommonAction.PRESS_INFORMATION_OBJECT,
              }),
            ],
          ],
        },
      },
    )
  })
}
