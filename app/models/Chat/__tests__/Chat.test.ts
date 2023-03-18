import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { EClientRank } from '../../Client/types/EClientRank'
import { createTestProvider } from '../../Provider/testUtils'
import { Chat } from '../Chat'
import { EChatMessageActor } from '../types/EChatMessageActor'

describe('Chat', () => {
  test('init', () => {
    const chat = new Chat()
    expect('read' in chat).toBeTruthy()
    expect('readAll' in chat).toBeTruthy()
    expect('create' in chat).toBeTruthy()
    expect('update' in chat).toBeTruthy()
    expect('delete' in chat).toBeTruthy()
    expect(chat.modelNamespace.startsWith('bot.chat')).toBeTruthy()
  })

  const clientTelegramId = Math.round(Math.random() * 100000)

  const providerTelegramId = Math.round(Math.random() * 100000)

  const name = uniqueId('userName')
  const message = uniqueId('message')
  const updatedMessage = uniqueId('message')

  const getChatForTest = async () => {
    const chat = new Chat()
    const chats = await chat.readAll()

    if (!chats) return

    return Object.values(chats).find(model => model.clientTelegramId === clientTelegramId)
  }

  test('create', async () => {
    expect.assertions(10)
    const chat = new Chat()
    const { status: clientUserCreationStatus, id: clientUserId } = await chat.client.user.create({
      name,
      telegramId: clientTelegramId,
    })
    expect(clientUserCreationStatus).toBe(EDbStatus.OK)

    const { status: clientCreationStatus } = await chat.client.create({
      userId: clientUserId,
      rank: EClientRank.NEW,
    })
    expect(clientCreationStatus).toBe(EDbStatus.OK)

    const providerInfo = await createTestProvider({
      name,
      description: '',
      telegramId: providerTelegramId,
      serviceName: 'Service',
      categoryName: 'Category',
    })
    if (!providerInfo) return

    const { status: providerCreationStatus, id: providerId } = await chat.provider.create({
      userId: providerInfo.userId,
      serviceId: providerInfo.serviceId,
      description: '',
    })
    expect(providerCreationStatus).toBe(EDbStatus.OK)

    const { status } = await chat.create({ clientTelegramId, providerId })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const chat = new Chat()
    const models = await chat.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(3)
    const chat = new Chat()

    const modelFromModels = await getChatForTest()
    if (!modelFromModels) return

    const model = await chat.read(modelFromModels.id)

    expect(model?.id).toBe(modelFromModels.id)
    expect(model?.clientTelegramId).toBe(clientTelegramId)
    expect(typeof model?.providerId).toBe('string')
  })

  test('addMessage', async () => {
    expect.assertions(2)
    const chat = new Chat()

    const model = await getChatForTest()
    if (!model) return

    const status = await chat.addMessage(model.id, clientTelegramId, message)

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await chat.read(model.id)

    expect(nextModel?.messagesHistory[0]?.message).toBe(message)
  })

  test('changeMessage', async () => {
    expect.assertions(3)
    const chat = new Chat()

    const model = await getChatForTest()
    if (!model) return

    const messageId = model.messagesHistory[0]?.id
    if (!messageId) return

    const status = await chat.changeMessage({
      chatId: model.id,
      message: updatedMessage,
      messageId,
    })
    const nextModel = await chat.read(model.id)
    const chatMessage = nextModel?.messagesHistory[0]

    expect(status).toBe(EDbStatus.OK)
    expect(chatMessage?.message).toBe(updatedMessage)
    expect(typeof chatMessage?.message).toBe('string')
  })

  test('createChatMessage', async () => {
    expect.assertions(4)
    const chat = new Chat()

    const chatMessage = await chat.createChatMessage(clientTelegramId, message)

    expect(typeof chatMessage.id).toBe('string')
    expect(typeof chatMessage.createdAt).toBe('string')
    expect(chatMessage.message).toBe(message)
    expect(chatMessage.sender).toBe(EChatMessageActor.CLIENT)
  })

  test('delete', async () => {
    expect.assertions(1)
    const chat = new Chat()
    const model = await getChatForTest()
    if (!model) return

    const status = await chat.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const chat = new Chat()
    dbClient.deleteNamespace(chat.modelNamespace)
    dbClient.deleteNamespace(chat.client.modelNamespace)
    dbClient.deleteNamespace(chat.provider.modelNamespace)
    dbClient.deleteNamespace(chat.provider.service.modelNamespace)
    dbClient.deleteNamespace(chat.provider.service.serviceCategory.modelNamespace)
    dbClient.deleteNamespace(chat.client.user.modelNamespace)
  })
})
