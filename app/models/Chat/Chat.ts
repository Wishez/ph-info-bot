import { v4 as uuid } from 'uuid'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Client } from '../Client/Client'
import { Provider } from '../Provider/Provider'
import { IUserModel } from '../User/types'
import { EChatMessageActor } from './types/EChatMessageActor'
import { IChatMessage } from './types/IChatMessage'
import { IChatModel } from './types'

interface IChangeMessageOptions {
  chatId: IChatModel['id']
  messageId: IChatMessage['id']
  message: IChatMessage['message']
}

export class Chat extends CrudOperations<IChatModel> {
  client = new Client()
  provider = new Provider()

  constructor() {
    super({ namespace: 'bot', modelName: 'chat' })
  }

  addMessage = async (
    chatId: IChatModel['id'],
    telegramId: IUserModel['telegramId'],
    message: IChatMessage['message'],
  ) => {
    const chat = await this.read(chatId)
    if (!chat) return EDbStatus.NOT_FOUND

    const chatMessage = await this.createChatMessage(telegramId, message)
    if (chatMessage === EDbStatus.NOT_FOUND) return EDbStatus.NOT_FOUND

    chat.messagesHistory.push(chatMessage)

    return await this.update(chatId, { messagesHistory: chat.messagesHistory })
  }

  changeMessage = async (options: IChangeMessageOptions) => {
    const { chatId, message, messageId } = options
    const chat = await this.read(chatId)
    if (!chat) return EDbStatus.NOT_FOUND

    const chatMessage = chat.messagesHistory.find(
      existedChatMessage => existedChatMessage.id === messageId,
    )
    if (!chatMessage) return EDbStatus.NOT_FOUND

    chatMessage.message = message
    chatMessage.updatedAt = new Date().toISOString()

    return await this.update(chatId, { messagesHistory: chat.messagesHistory })
  }

  createChatMessage = async (
    telegramId: IUserModel['telegramId'],
    message: IChatMessage['message'],
  ) => {
    const provider = await this.provider.getProviderByUserTelegramId(telegramId)
    const client = await this.client.getClientByUserTelegramId(telegramId)
    if (!(provider && client)) return EDbStatus.NOT_FOUND

    let sender: EChatMessageActor = EChatMessageActor.CLIENT
    if (client) sender = EChatMessageActor.CLIENT
    else if (provider) sender = EChatMessageActor.PROVIDER
    const chatMessage: IChatMessage = {
      id: uuid(),
      sender,
      message,
      createdAt: new Date().toISOString(),
    }

    return chatMessage
  }

  create = async (
    model: Omit<IChatModel, 'id' | 'createdAt' | 'updatedAt' | 'messagesHistory'>,
  ) => {
    const { clientTelegramId, providerTelegramId } = model
    const provider = await this.provider.getProviderByUserTelegramId(providerTelegramId)
    const client = await this.client.getClientByUserTelegramId(clientTelegramId)

    if (!(provider && client)) {
      return {
        id: '',
        status: EDbStatus.ERROR,
      }
    }

    return await super.create({ ...model, messagesHistory: [] })
  }
}
