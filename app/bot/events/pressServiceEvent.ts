import type { CallbackQuery } from 'node-telegram-bot-api'
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

const FETCH_SERVICE = query$.service(
  serviceSchema$.name.providers(
    providerListSchema$.id.description.user(userSchema$.name.telegramId.avatar),
  ),
)

export const pressServiceEvent = async (context: IPressServiceContext, query: CallbackQuery) => {
  const response = await execute(FETCH_SERVICE, { variables: { id: context.id } })
  const receiver = query.from.id

  if (!response.service.providers.length) {
    bot.sendMessage(receiver, 'Для этой услуги пока нет операторов🫣 Пожалуйста, выберите другую')

    return
  }

  bot.sendMessage(receiver, 'Выберите оператора')
  response.service.providers.forEach(async ({ description, user, id }) => {
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
