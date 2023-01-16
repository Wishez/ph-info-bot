import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { getServiceByName } from '../../Service/utils'
import { ServiceCategory } from '../../ServiceCategory/ServiceCategory'
import { User } from '../../User/User'
import { Provider } from '../Provider'

describe('provider', () => {
  test('init', () => {
    const provider = new Provider()
    expect('read' in provider).toBeTruthy()
    expect('readAll' in provider).toBeTruthy()
    expect('create' in provider).toBeTruthy()
    expect('update' in provider).toBeTruthy()
    expect('delete' in provider).toBeTruthy()
    expect(provider.user).toBeInstanceOf(User)
    expect(provider.modelNamespace).toBe('bot.provider.test')
  })

  const telegramId = uniqueId('userTelegramId')
  const name = uniqueId('userName')
  const description = uniqueId('providerDescription')
  const updatedDescription = uniqueId('providerDescription')
  const serviceName = uniqueId('serviceName')
  const categoryName = uniqueId('serviceCategoryName')
  test('create', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const { status: userCreationStatus } = await provider.user.create({ name, telegramId })

    expect(userCreationStatus).toBe(EDbStatus.OK)

    const user = await provider.user.getUserByTelegramId(telegramId)
    if (!user) return

    const { status } = await provider.create({ userId: user.id, description, servicesIds: [] })

    expect(status).toBe(EDbStatus.OK)
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

    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    expect(typeof model.id).toBe('string')
    expect(model.servicesIds.length).toBe(0)
    expect(typeof model.createdAt).toBe('string')
    expect(typeof model.userId).toBe('string')
    expect(model.description).toBe(description)
  })

  test('update', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const status = await provider.update(model.id, { description: updatedDescription })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await provider.read(model.id)

    expect(nextModel?.description).toBe(updatedDescription)
  })

  test('getUser', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const userModel = await provider.getUser(model.id)

    if (!userModel || userModel === EDbStatus.NOT_FOUND) return

    expect(userModel.telegramId).toBe(telegramId)
    expect(userModel.name).toBe(name)
  })

  test('bindServices', async () => {
    expect.assertions(4)
    const provider = new Provider()
    const serviceCategory = new ServiceCategory()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const { status: serviceCategoryCreationStatus, id: categoryId } = await serviceCategory.create({
      name: categoryName,
      description,
    })
    expect(serviceCategoryCreationStatus).toBe(EDbStatus.OK)

    const { status: serviceCreationStatus, id: serviceId } = await provider.service.create({
      name: serviceName,
      description,
      categoryId,
      attributesIds: [],
    })
    expect(serviceCreationStatus).toBe(EDbStatus.OK)

    const bindingStatus = await provider.bindServices(model.id, [serviceId])
    expect(bindingStatus).toBe(EDbStatus.OK)

    const nextModel = await provider.read(model.id)

    expect(nextModel?.servicesIds[0]).toBe(serviceId)
  })

  test('getProvidedServices', async () => {
    expect.assertions(2)
    const provider = new Provider()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const service = await getServiceByName(provider.service, serviceName)
    if (!service) return

    const services = await provider.getProvidedServices(model.id)
    if (services === EDbStatus.NOT_FOUND) return

    expect(services[service.id]?.id).toBe(service.id)
    expect(Object.values(services).length).toBe(1)
  })

  test('unmountService', async () => {
    expect.assertions(3)
    const provider = new Provider()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const service = await getServiceByName(provider.service, serviceName)
    if (!service) return

    const unmountingServiceStatus = await provider.unmountService(model.id, service.id)
    expect(unmountingServiceStatus).toBe(EDbStatus.OK)

    const services = await provider.getProvidedServices(model.id)
    if (services === EDbStatus.NOT_FOUND) return

    expect(services[service.id]).toBeUndefined()
    expect(Object.values(services).length).toBe(0)
  })

  test('delete', async () => {
    expect.assertions(1)
    const provider = new Provider()
    const model = await provider.getProviderByUserTelegramId(telegramId)
    if (model === EDbStatus.NOT_FOUND) return

    const status = await provider.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const provider = new Provider()
    const serviceCategory = new ServiceCategory()
    dbClient.deleteNamespace(provider.modelNamespace)
    dbClient.deleteNamespace(provider.user.modelNamespace)
    dbClient.deleteNamespace(provider.service.modelNamespace)
    dbClient.deleteNamespace(serviceCategory.modelNamespace)
  })
})
