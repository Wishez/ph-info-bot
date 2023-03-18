import type { CallbackQuery } from 'node-telegram-bot-api'
import { execute } from '../../__generated'
import {
  query$,
  serviceCategoryListSchema$,
  serviceCategorySchema$,
  serviceListSchema$,
} from '../../__generated/fetchers'
import { CallbackButton } from '../components'
import { ECommonAction } from '../types/actions'
import { IPressCategoryContext, IPressServiceContext } from '../types/context'
import { bot } from '../'

const FETCH_CATEGORY = query$.serviceCategory(
  serviceCategorySchema$.name
    .services(serviceListSchema$.id.name)
    .subcategories(serviceCategoryListSchema$.id.name),
)

export const pressCategoryEvent = async (context: IPressCategoryContext, query: CallbackQuery) => {
  const category = await execute(FETCH_CATEGORY, { variables: { id: context.id } })

  await bot.sendMessage(query.from.id, 'Выберите сервис', {
    reply_markup: {
      // TODO добавить кнопку «назад»
      inline_keyboard: category.serviceCategory.services.map(({ name, id }) => [
        CallbackButton<IPressServiceContext>(name, {
          id,
          action: ECommonAction.PRESS_SERVICE,
        }),
      ]),
    },
  })
}
