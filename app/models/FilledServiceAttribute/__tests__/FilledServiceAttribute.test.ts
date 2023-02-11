import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { createTestOrder } from '../../Order/testUtils'
import { IServiceModel } from '../../Service/types'
import { getServiceAttributeByName } from '../../ServiceAttribute/utils'
import { IServiceCategoryModel } from '../../ServiceCategory/types'
import { IUserModel } from '../../User/types'
import { FilledServiceAttribute } from '../FilledServiceAttribute'
import { IFilledServiceAttributeModel } from '../types'
import { getFilledServiceAttributeByValue } from '../utils'

describe('filledServiceAttribute', () => {
  test('init', () => {
    const filledServiceAttribute = new FilledServiceAttribute()
    expect('read' in filledServiceAttribute).toBeTruthy()
    expect('readAll' in filledServiceAttribute).toBeTruthy()
    expect('create' in filledServiceAttribute).toBeTruthy()
    expect('update' in filledServiceAttribute).toBeTruthy()
    expect('delete' in filledServiceAttribute).toBeTruthy()
    expect(
      filledServiceAttribute.modelNamespace.startsWith('bot.filledServiceAttribute'),
    ).toBeTruthy()
  })

  const value: IFilledServiceAttributeModel['value'] = uniqueId('filledAttributeValue')
  const updatedValue: IFilledServiceAttributeModel['value'] = uniqueId('filledAttributeValue')
  const userName: IUserModel['name'] = uniqueId('userName')
  const description: string = uniqueId('description')
  const serviceAttributeName: IUserModel['name'] = uniqueId('serviceAttributeName')
  const categoryName: IServiceCategoryModel['name'] = uniqueId('categoryName')
  const serviceName: IServiceModel['name'] = uniqueId('serviceName')
  const clientTelegramId: IUserModel['telegramId'] = uniqueId('telegramId')
  const providerTelegramId: IUserModel['telegramId'] = uniqueId('telegramId')
  test('create', async () => {
    expect.assertions(10)
    const filledServiceAttribute = new FilledServiceAttribute()

    const { orderId, attributeId } = await createTestOrder({
      userName,
      clientTelegramId,
      providerTelegramId,
      description,
      serviceName,
      attributeName: serviceAttributeName,
      categoryName,
    })
    expect(typeof orderId).toBe('string')

    const { status } = await filledServiceAttribute.create({
      orderId,
      value,
      serviceAttributeId: attributeId,
    })

    expect(status).toBe(EDbStatus.OK)
  })

  test('read all', async () => {
    expect.assertions(2)
    const filledServiceAttribute = new FilledServiceAttribute()
    const models = await filledServiceAttribute.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(2)
    const filledServiceAttribute = new FilledServiceAttribute()

    const modelFromModels = await getFilledServiceAttributeByValue(filledServiceAttribute, value)
    if (!modelFromModels) return

    const model = await filledServiceAttribute.read(modelFromModels.id)
    if (!model) return

    expect(model.id).toBe(modelFromModels.id)
    expect(model.value).toBe(value)
  })

  test('update', async () => {
    expect.assertions(3)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, value)
    if (!model) return

    const status = await filledServiceAttribute.update(model.id, {
      value: updatedValue,
    })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await filledServiceAttribute.read(model.id)
    if (!nextModel) return

    expect(typeof nextModel.updatedAt).toBe('string')
    expect(nextModel.value).toBe(updatedValue)
  })

  test('getAttribute', async () => {
    expect.assertions(1)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    if (!model) return

    const attribute = await filledServiceAttribute.getAttribute(model.id)
    if (attribute === EDbStatus.NOT_FOUND) return

    expect(attribute.name).toBe(serviceAttributeName)
  })

  test('getFilledAttributesByIds', async () => {
    expect.assertions(3)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    if (!model) return

    expect(model.value).toBe(updatedValue)

    const filledAttributes = await filledServiceAttribute.getFilledAttributesByIds([model.id])
    if (filledAttributes === EDbStatus.NOT_FOUND) return

    expect(filledAttributes[model.id]?.value).toBe(updatedValue)
    expect(typeof filledAttributes[model.id]?.serviceAttribute.id).toBe('string')
  })

  test('getAttributesByFilledAttributesIds', async () => {
    expect.assertions(2)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    if (!model) return

    expect(model.value).toBe(updatedValue)

    const attributes = await filledServiceAttribute.getAttributesByFilledAttributesIds([model.id])
    if (attributes === EDbStatus.NOT_FOUND) return

    const attribute = await getServiceAttributeByName(
      filledServiceAttribute.serviceAttribute,
      serviceAttributeName,
    )

    if (!attribute) return

    expect(attributes[attribute.id]?.name).toBe(serviceAttributeName)
  })

  test('getClient', async () => {
    expect.assertions(4)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    expect(model).toBeInstanceOf(Object)
    if (!model) return

    const client = await filledServiceAttribute.getClient(model.id)
    expect(client).toBeInstanceOf(Object)
    if (client === EDbStatus.NOT_FOUND) return

    const user = await FilledServiceAttribute.order.client.getUser(client.id)
    expect(user).toBeInstanceOf(Object)
    if (user === EDbStatus.NOT_FOUND) return

    expect(user.telegramId).toBe(clientTelegramId)
  })

  test('delete', async () => {
    expect.assertions(1)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    if (!model?.id) return

    const status = await filledServiceAttribute.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const filledServiceAttribute = new FilledServiceAttribute()
    dbClient.deleteNamespace(filledServiceAttribute.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.service.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.client.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.client.user.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.provider.modelNamespace)
    dbClient.deleteNamespace(FilledServiceAttribute.order.chat.modelNamespace)
    dbClient.deleteNamespace(filledServiceAttribute.serviceAttribute.modelNamespace)
  })
})
