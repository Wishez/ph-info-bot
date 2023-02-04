import isEmpty from 'lodash/isEmpty'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { User } from '../User'

describe('User', () => {
  test('init', () => {
    const user = new User()
    expect('read' in user).toBeTruthy()
    expect('readAll' in user).toBeTruthy()
    expect('create' in user).toBeTruthy()
    expect('update' in user).toBeTruthy()
    expect('delete' in user).toBeTruthy()
    expect(user.modelNamespace.startsWith('bot.user')).toBeTruthy()
  })

  const telegramId = 'shiningfinger'
  const name = 'Phil'
  const updatedName = 'Zhuravlev'
  test('create', async () => {
    expect.assertions(1)
    const user = new User()
    const { status } = await user.create({ name, telegramId })

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
  })
})
