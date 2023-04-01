import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { ServiceCategory } from '../../ServiceCategory/ServiceCategory'
import { User } from '../../User/User'
import { Provider } from '../Provider'
import { createTestProvider } from '../testUtils'

describe('Provider', () => {
  test('init', () => {
    const provider = new Provider()
    expect('read' in provider).toBeTruthy()
    expect('readAll' in provider).toBeTruthy()
    expect('create' in provider).toBeTruthy()
    expect('update' in provider).toBeTruthy()
    expect('delete' in provider).toBeTruthy()
    expect(provider.user).toBeInstanceOf(User)
    expect(provider.modelNamespace.startsWith('bot.provider')).toBeTruthy()
  })

  const telegramId = Math.round(Math.random() * 100000)

  const name = uniqueId('userName')
  const description = uniqueId('providerDescription')
  const updatedDescription = uniqueId('providerDescription')
  const serviceName = uniqueId('serviceName')
  const categoryName = uniqueId('serviceCategoryName')
  test('create', async () => {
    expect.assertions(6)
    await createTestProvider({
      name,
      description,
      telegramId,
      serviceName,
      categoryName,
    })
  })

  test('read all', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const models = await provider.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(5)
    const provider = new Provider()

    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    expect(typeof model.id).toBe('string')
    expect(typeof model.serviceId).toBe('string')
    expect(typeof model.createdAt).toBe('string')
    expect(typeof model.userId).toBe('string')
    expect(model.description).toBe(description)
  })

  test('update', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    const status = await provider.update(model.id, { description: updatedDescription })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await provider.read(model.id)

    expect(nextModel?.description).toBe(updatedDescription)
  })

  test('getUser', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    const userModel = await provider.getUser(model.id)

    if (!userModel || userModel === EDbStatus.NOT_FOUND) return

    expect(userModel.telegramId).toBe(telegramId)
    expect(userModel.name).toBe(name)
  })

  test('getProvidedService', async () => {
    expect.assertions(1)
    const provider = new Provider()
    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    const providedService = await provider.getProvidedService(model.id)
    if (providedService === EDbStatus.NOT_FOUND) return

    expect(providedService.providersIds.includes(model.id)).toBeTruthy()
  })

  test('getProviderInformationObjects', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    const { id: informationObjectId, status } = await provider.informationObject.create({
      providerId: model.id,
      name: 'Information Object',
      description: 'Information Object description',
      gallery: [],
    })
    expect(status).toBe(EDbStatus.OK)

    const informationObject = await provider.informationObject.read(informationObjectId)
    if (!informationObject) return

    const providerInformationObjects = await provider.getProviderInformationObjects(model.id)

    if (
      providerInformationObjects === EDbStatus.ERROR ||
      providerInformationObjects === EDbStatus.NOT_FOUND
    ) {
      return
    }

    expect(informationObject.id).toBe(providerInformationObjects[informationObjectId]?.id)
  })

  test('delete', async () => {
    expect.assertions(3)
    const provider = new Provider()
    const models = await provider.getProvidersByUserTelegramId(telegramId)
    if (models === EDbStatus.NOT_FOUND) return

    const model = models[0]
    if (!model) return

    const status = await provider.delete(model.id)

    expect(status).toBe(EDbStatus.OK)

    const user = await provider.user.read(model.userId)
    const service = await provider.service.read(model.serviceId)
    if (!(service && user)) return

    expect(user.providersIds?.includes(model.id)).toBeFalsy()
    expect(service.providersIds?.includes(model.id)).toBeFalsy()
  })

  afterAll(() => {
    const provider = new Provider()
    const serviceCategory = new ServiceCategory()
    dbClient.deleteNamespace(provider.modelNamespace)
    dbClient.deleteNamespace(provider.user.modelNamespace)
    dbClient.deleteNamespace(provider.service.modelNamespace)
    dbClient.deleteNamespace(provider.informationObject.modelNamespace)
    dbClient.deleteNamespace(serviceCategory.modelNamespace)
  })
})
