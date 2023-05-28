import { InlineKeyboardButton, KeyboardButton } from 'node-telegram-bot-api'
import { ActionContext } from '../../models/ActionContext/ActionContext'
import { HashingService } from '../../services/HashingService/HashingService'

const creatActionContext = async <GData extends {}>(context: GData) => {
  const actionContextId = HashingService.sha1(context)
  const actionContextInstance = new ActionContext()
  const actionContext = await actionContextInstance.read<GData>(actionContextId)
  if (!actionContext) await actionContextInstance.create(context)
}

export const CallbackButton = <GData extends {}>(
  text: string,
  context: GData,
): InlineKeyboardButton | KeyboardButton => {
  creatActionContext(context)

  return {
    text,
    callback_data: HashingService.sha1(context),
  }
}
