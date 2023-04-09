import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Chat } from '../Chat/Chat'
import { IChatModel } from '../Chat/types'
import { IUserModel } from './types'

export class User extends CrudOperations<IUserModel> {
  get chat() {
    return new Chat()
  }

  constructor() {
    super({ namespace: 'bot', modelName: 'user' })
  }

  getUserByTelegramId = async (telegramId: IUserModel['telegramId']) => {
    const models = await this.readAll()
    if (!models) return

    return Object.values(models).find(model => model.telegramId === telegramId)
  }

  connectToChat = async (id: IUserModel['id'], chatId: IChatModel['id']) => {
    const chat = await this.chat.read(chatId)
    const user = await this.read(id)
    if (!(chat && user)) return EDbStatus.NOT_FOUND

    return await this.update(id, { currentChatId: chatId })
  }

  leaveChat = async (id: IUserModel['id']) => {
    return await this.update(id, { currentChatId: undefined })
  }
}
