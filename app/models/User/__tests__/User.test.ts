import isEmpty from 'lodash/isEmpty'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { Chat } from '../../Chat/Chat'
import { IChatModel } from '../../Chat/types'
import { Order } from '../../Order/Order'
import { EOrderStatus, IOrderModel } from '../../Order/types'
import { Provider } from '../../Provider/Provider'
import { IProviderModel } from '../../Provider/types'
import { IUserModel } from '../types'
import { User } from '../User'

jest.mock('../../Chat/Chat')
jest.mock('../../Order/Order')
jest.mock('../../Provider/Provider')

describe('User', () => {
  const testChatId = '42'
  const mockedChat = jest.mocked(Chat).mockImplementation(() => {
    const ActualChat = jest.requireActual<{ Chat: typeof Chat }>('../../Chat/Chat').Chat
    const chat = new ActualChat()

    chat.read = jest.fn(
      (): Promise<IChatModel> =>
        Promise.resolve({
          id: testChatId,
          providerId: '',
          clientTelegramId: 42,
          updatedAt: '',
          messagesHistory: [],
          createdAt: '',
        }),
    )

    return chat
  })

  const testOrderId = '42'
  const mockedOrder = jest.mocked(Order).mockImplementation(() => {
    const ActualOrder = jest.requireActual<{ Order: typeof Order }>('../../Order/Order').Order
    const order = new ActualOrder()
    const testOrder: IOrderModel = {
      id: testOrderId,
      chatId: testChatId,
      providerId: '',
      clientId: '',
      serviceId: '',
      status: EOrderStatus.IN_PROCESS,
      filledServicesAttributesIds: [],
      createdAt: '',
    }

    order.read = jest.fn(() => Promise.resolve(testOrder))
    order.readAll = jest.fn(() => Promise.resolve({ [testOrderId]: testOrder }))

    return order
  })

  const testProviderId = '42'
  const mockedProvider = jest.mocked(Provider).mockImplementation(() => {
    const ActualProvider = jest.requireActual<{ Provider: typeof Provider }>(
      '../../Provider/Provider',
    ).Provider
    const provider = new ActualProvider()
    const testProvider: IProviderModel = {
      id: testProviderId,
      userId: '',
      serviceId: '',
      description: '',
      createdAt: '',
    }

    provider.read = jest.fn(() => Promise.resolve(testProvider))
    provider.readAll = jest.fn(() => Promise.resolve({ [testProviderId]: testProvider }))

    return provider
  })

  test('init', () => {
    const user = new User()
    expect('read' in user).toBeTruthy()
    expect('readAll' in user).toBeTruthy()
    expect('create' in user).toBeTruthy()
    expect('update' in user).toBeTruthy()
    expect('delete' in user).toBeTruthy()
    expect(user.modelNamespace.startsWith('bot.user')).toBeTruthy()
  })

  const telegramId: IUserModel['telegramId'] = Math.round(Math.random() * 10000)
  const name = 'Phil'
  const updatedName = 'Zhuravlev'
  test('create', async () => {
    expect.assertions(1)
    const user = new User()
    const { status } = await user.create({ name, telegramId, providersIds: [testProviderId] })

    expect(status).toBe(EDbStatus.OK)
  })

  test('getUserByTelegramId', async () => {
    expect.assertions(1)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)

    if (!model) return

    expect(model.telegramId).toBe(telegramId)
  })

  test('read all', async () => {
    expect.assertions(2)
    const user = new User()
    const models = await user.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(2)
    const user = new User()

    const modelFromModels = await user.getUserByTelegramId(telegramId)
    if (!modelFromModels?.id) return

    const model = await user.read(modelFromModels?.id)

    expect(model?.telegramId).toBe(telegramId)
    expect(model?.name).toBe(name)
  })

  test('update', async () => {
    expect.assertions(3)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const status = await user.update(model.id, { name: updatedName })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await user.read(model.id)

    expect(nextModel?.telegramId).toBe(telegramId)
    expect(nextModel?.name).toBe(updatedName)
  })

  test('connectToChat', async () => {
    expect.assertions(2)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const status = await user.connectToChat(model.id, testChatId)
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await user.read(model.id)
    expect(nextModel?.currentChatId).toBe(testChatId)
  })

  test('leaveChat', async () => {
    expect.assertions(2)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const status = await user.leaveChat(model.id)
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await user.read(model.id)
    expect(nextModel?.currentChatId).toBeUndefined()
  })

  test('addOrder', async () => {
    expect.assertions(2)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const status = await user.addOrder(model.id, testOrderId)
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await user.read(model.id)
    expect(nextModel?.ordersIds?.[0]).toBe(testOrderId)
  })

  test('getUserOrders', async () => {
    expect.assertions(1)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const orders = await user.getUserOrders(model.id)
    if (orders === EDbStatus.NOT_FOUND) return

    expect(testOrderId in orders).toBeTruthy()
  })

  test('getUserProviders', async () => {
    expect.assertions(1)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const providers = await user.getUserProviders(model.id)
    if (providers === EDbStatus.NOT_FOUND) return

    expect(testProviderId in providers).toBeTruthy()
  })

  test('delete', async () => {
    expect.assertions(1)
    const user = new User()
    const model = await user.getUserByTelegramId(telegramId)
    if (!model?.id) return

    const status = await user.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const user = new User()
    dbClient.deleteNamespace(user.modelNamespace)
    mockedChat.mockRestore()
    mockedOrder.mockRestore()
    mockedProvider.mockRestore()
  })
})
