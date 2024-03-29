import { execute } from '../../../__generated'
import { query$, serviceCategoryListSchema$ } from '../../../__generated/fetchers'
import { CallbackButton } from '../../components'
import { withMessageErrorLogger } from '../../helpers/errors'
import { bot } from '../../index'
import { ECommonAction } from '../../types/actions'
import type { IPressCategoryContext } from '../../types/context'
import { tryToCreateUser } from '../actions'

const FETCH_SERVICE_CATEGORIES = query$.serviceCategories(
  serviceCategoryListSchema$.id.name.parentId.servicesIds.subcategoriesIds,
)

export const onChooseCategoriesCommand = withMessageErrorLogger(
  'onChooseCategoriesCommand',
  async msg => {
    const userTelegramId = msg.chat.id
    await bot.sendChatAction(userTelegramId, 'typing')
    const fetchingServiceCategoriesResponse = await execute(FETCH_SERVICE_CATEGORIES)
    const userFromChat = msg.from

    await bot.sendMessage(userTelegramId, 'Я в разработке, но вы можете меня по-тыкать😅')
    await bot.sendChatAction(userTelegramId, 'typing')
    if (userFromChat) await tryToCreateUser(userFromChat)

    await bot.sendMessage(userTelegramId, 'Выберите категорию', {
      reply_markup: {
        inline_keyboard: fetchingServiceCategoriesResponse.serviceCategories
          .filter(
            ({ parentId, servicesIds, subcategoriesIds }) =>
              !parentId && Boolean(servicesIds?.length || subcategoriesIds?.length),
          )
          .map(({ name, id }) => [
            CallbackButton<IPressCategoryContext>(name, {
              id,
              action: ECommonAction.PRESS_CATEGORY,
            }),
          ]),
      },
    })
  },
)
