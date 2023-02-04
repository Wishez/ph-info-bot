import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { User } from '../../User/User'
import { Client } from '../Client'
import { EClientRank } from '../types/EClientRank'

describe('Client', () => {
  test('init', () => {
    const client = new Client()
    expect('read' in client).toBeTruthy()
    expect('readAll' in client).toBeTruthy()
    expect('create' in client).toBeTruthy()
    expect('update' in client).toBeTruthy()
    expect('delete' in client).toBeTruthy()
    expect(client.user).toBeInstanceOf(User)
    expect(client.modelNamespace.startsWith('bot.client')).toBeTruthy()
  })

  const telegramId = uniqueId('userTelegramId')
  const name = uniqueId('userName')
  test('create', async () => {
    expect.assertions(2)
    const client = new Client()
    const { status: userCreationStatus } = await client.user.create({ name, telegramId })

    expect(userCreationStatus).toBe(EDbStatus.OK)

    const user = await client.user.getUserByTelegramId(telegramId)
    if (!user) return

    const { status } = await client.create({ userId: user.id, rank: EClientRank.NEW })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const user = new Client()
    const models = await user.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(2)
    const client = new Client()

    const modelFromModels = await client.getClientByUserTelegramId(telegramId)
    if (modelFromModels === EDbStatus.NOT_FOUND) return

    const model = await client.read(modelFromModels.id)

    expect(typeof model?.id).toBe('string')
    expect(model?.rank).toBe(EClientRank.NEW)
  })

  test('update', async () => {
    expect.assertions(2)
    const client = new Client()
    const model = await client.getClientByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const status = await client.update(model.id, { rank: EClientRank.ACTIVE })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await client.read(model.id)

    expect(nextModel?.rank).toBe(EClientRank.ACTIVE)
  })

  test('getUser', async () => {
    expect.assertions(2)
    const client = new Client()
    const model = await client.getClientByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const userModel = await client.getUser(model.id)

    if (!userModel || userModel === EDbStatus.NOT_FOUND) return

    expect(userModel.telegramId).toBe(telegramId)
    expect(userModel.name).toBe(name)
  })

  test('delete', async () => {
    expect.assertions(1)
    const client = new Client()
    const model = await client.getClientByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const status = await client.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const client = new Client()
    dbClient.deleteNamespace(client.modelNamespace)
    dbClient.deleteNamespace(client.user.modelNamespace)
  })
})
