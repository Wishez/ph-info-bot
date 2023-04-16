import { IInformationObjectModel } from '../../../models/InformationObject/types'
import { IUserModel } from '../../../models/User/types'
import { CallbackButton } from '../../components'
import { bot } from '../../index'

interface IInformationObject
  extends Readonly<Pick<IInformationObjectModel, 'name' | 'description'>> {
  gallery: ReadonlyArray<IInformationObjectModel['gallery'][number]>
}

interface IOptions<GContext extends object> {
  informationObject: IInformationObject
  userTelegramId: IUserModel['telegramId']
  button: ReturnType<typeof CallbackButton<GContext>>
}

export const sendInformationObject = async <GContext extends object>(
  options: IOptions<GContext>,
) => {
  const { informationObject, userTelegramId, button } = options
  const { name, description, gallery } = informationObject
  await bot.sendMediaGroup(
    userTelegramId,
    gallery.map(({ url }) => ({ media: url, type: 'photo' })),
  )

  await bot.sendMessage(
    userTelegramId,
    `
${name}

${description}
    `,
    {
      reply_markup: {
        inline_keyboard: [[button]],
      },
    },
  )
}
