import { execute } from '../../../__generated'
import { query$, serviceCategoryListSchema$ } from '../../../__generated/fetchers'
import { CallbackButton } from '../../components'
import { bot } from '../../index'
import { ECommonAction } from '../../types/actions'
import type { IPressCategoryContext } from '../../types/context'
import { tryToCreateUser } from './actions'

const FETCH_SERVICE_CATEGORIES = query$.serviceCategories(
  serviceCategoryListSchema$.id.name.parentId,
)

export const useStartCommand = () => {
  bot.onText(/\/start/, async msg => {
    const userTelegramId = msg.chat.id
    await bot.sendChatAction(userTelegramId, 'typing')
    const fetchingServiceCategoriesResponse = await execute(FETCH_SERVICE_CATEGORIES)
    const user = msg.from

    await bot.sendMessage(userTelegramId, 'Я в разработке, но вы можете меня по-тыкать😅')
    await bot.sendChatAction(userTelegramId, 'typing')
    if (user) await tryToCreateUser(user)
    await bot.sendMessage(userTelegramId, 'Выберите категорию', {
      reply_markup: {
        inline_keyboard: fetchingServiceCategoriesResponse.serviceCategories
          .filter(({ parentId }) => !parentId)
          .map(({ name, id }) => [
            CallbackButton<IPressCategoryContext>(name, {
              id,
              action: ECommonAction.PRESS_CATEGORY,
            }),
          ]),
      },
    })
  })
}
