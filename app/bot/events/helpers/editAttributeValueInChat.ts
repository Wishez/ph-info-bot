import { execute } from '../../../__generated'
import {
  filledServiceAttributeSchema$,
  query$,
  serviceAttributeSchema$,
} from '../../../__generated/fetchers'
import { IFilledServiceAttributeModel } from '../../../models/FilledServiceAttribute/types'
import { IUserModel } from '../../../models/User/types'
import { CallbackButton } from '../../components'
import { bot } from '../../index'
import { ECommonAction } from '../../types/actions'
import { IChooseAttributeValueContext } from '../../types/context'

interface IEditingAttributeValueOptions {
  filledAttributeId: IFilledServiceAttributeModel['id']
  userChatId: IUserModel['telegramId']
}

const FETCH_FILLED_ATTRIBUTE = query$.filledServiceAttribute(
  filledServiceAttributeSchema$.id.value.orderId.replyMessageIds.serviceAttribute(
    serviceAttributeSchema$.name.notice.options,
  ),
)

export const editAttributeValueInChat = async (options: IEditingAttributeValueOptions) => {
  const { userChatId, filledAttributeId } = options
  const { filledServiceAttribute } = await execute(FETCH_FILLED_ATTRIBUTE, {
    variables: { id: filledAttributeId },
  })
  await Promise.all(
    (filledServiceAttribute.replyMessageIds || []).map(async replyMessageId => {
      try {
        await bot.editMessageText(
          `
${filledServiceAttribute.serviceAttribute.name} — ${filledServiceAttribute.value}

${filledServiceAttribute.serviceAttribute.notice || ''}
`,
          {
            message_id: replyMessageId,
            chat_id: userChatId,
            reply_markup: {
              inline_keyboard:
                filledServiceAttribute.serviceAttribute.options?.map(option => [
                  CallbackButton<IChooseAttributeValueContext>(option, {
                    action: ECommonAction.CHOOSE_ATTRIBUTE_VALUE,
                    value: option,
                    filledAttributeId: filledAttributeId,
                  }),
                ]) ?? [],
            },
          },
        )
      } catch {
        return Promise.resolve()
      }
    }),
  )
}
