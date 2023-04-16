import { execute } from '../../__generated'
import {
  providerListSchema$,
  query$,
  serviceSchema$,
  userSchema$,
} from '../../__generated/fetchers'
import { getUserPhoto } from '../api/user'
import { CallbackButton } from '../components'
import { bot } from '../index'
import { ECommonAction } from '../types/actions'
import { IPressProviderContext, IPressServiceContext } from '../types/context'
import { TEvent } from './types'

const FETCH_SERVICE = query$.service(
  serviceSchema$.name.description.providers(
    providerListSchema$.id.description.user(userSchema$.name.telegramId.avatar),
  ),
)

export const pressServiceEvent: TEvent<IPressServiceContext> = async (context, query) => {
  const receiver = query.from.id
  await bot.sendChatAction(receiver, 'typing')
  const response = await execute(FETCH_SERVICE, { variables: { id: context.id } })
  const { service } = response
  if (service.description) await bot.sendMessage(receiver, service.description)

  if (!service.providers.length) {
    bot.sendMessage(receiver, 'Для этой услуги пока нет операторов🫣 Пожалуйста, выберите другую')

    return
  }

  bot.sendMessage(receiver, 'Выберите оператора')
  service.providers.forEach(async ({ description, user, id }) => {
    const userAvatarUrl = await getUserPhoto(user.telegramId)

    bot.sendPhoto(receiver, userAvatarUrl, {
      caption: `
        **${user.name}**

${description}
      `,
      parse_mode: 'MarkdownV2',
      reply_markup: {
        inline_keyboard: [
          [
            CallbackButton<IPressProviderContext>('Выбрать', {
              id,
              action: ECommonAction.PRESS_PROVIDER,
            }),
          ],
        ],
      },
    })
  })
}
