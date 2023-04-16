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
import { TEvent } from './types'

const FETCH_CATEGORY = query$.serviceCategory(
  serviceCategorySchema$.name.description
    .services(serviceListSchema$.id.name)
    .subcategories(serviceCategoryListSchema$.id.name),
)

export const pressCategoryEvent: TEvent<IPressCategoryContext> = async (context, query) => {
  const receiver = query.from.id
  await bot.sendChatAction(receiver, 'typing')
  const category = await execute(FETCH_CATEGORY, { variables: { id: context.id } })
  const { serviceCategory } = category
  if (serviceCategory.description) await bot.sendMessage(receiver, serviceCategory.description)
  const hasSomethingToShow = Boolean(
    serviceCategory.services?.length || serviceCategory.subcategories?.length,
  )

  if (hasSomethingToShow) {
    if (serviceCategory.services?.length) {
      await bot.sendMessage(receiver, 'Выберите сервис', {
        reply_markup: {
          inline_keyboard: serviceCategory.services.map(({ name, id }) => [
            CallbackButton<IPressServiceContext>(name, {
              id,
              action: ECommonAction.PRESS_SERVICE,
            }),
          ]),
        },
      })
    }

    if (serviceCategory.subcategories?.length) {
      await bot.sendMessage(receiver, 'Выберите под-категорию', {
        reply_markup: {
          inline_keyboard: serviceCategory.subcategories.map(({ name, id }) => [
            CallbackButton<IPressCategoryContext>(name, {
              id,
              action: ECommonAction.PRESS_CATEGORY,
            }),
          ]),
        },
      })
    }
  } else {
    await bot.sendMessage(
      receiver,
      'В данный момент, я не могу предоставить вам список сервисов🤷🏼‍♂️ Пожалуйста, выберите другую категорию🤓',
    )
  }
}
