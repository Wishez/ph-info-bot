import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { EClientRank } from '../../Client/types/EClientRank'
import { getServiceAttributeByName } from '../../ServiceAttribute/utils'
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
    expect(filledServiceAttribute.modelNamespace).toBe('bot.filledServiceAttribute.test')
  })

  const value: IFilledServiceAttributeModel['value'] = uniqueId('filledAttributeValue')
  const updatedValue: IFilledServiceAttributeModel['value'] = uniqueId('filledAttributeValue')
  const userName: IUserModel['name'] = uniqueId('userName')
  const serviceAttributeName: IUserModel['name'] = uniqueId('serviceAttributeName')
  const telegramId: IUserModel['telegramId'] = uniqueId('telegramId')
  test('create', async () => {
    expect.assertions(4)
    const filledServiceAttribute = new FilledServiceAttribute()
    const { status: userCreationStatus, id: userId } =
      await filledServiceAttribute.client.user.create({ name: userName, telegramId })
    expect(userCreationStatus).toBe(EDbStatus.OK)

    const { status: clientCreationStatus, id: clientId } =
      await filledServiceAttribute.client.create({
        userId,
        rank: EClientRank.NEW,
      })
    expect(clientCreationStatus).toBe(EDbStatus.OK)

    const { status: serviceAttributeCreationStatus, id: serviceAttributeId } =
      await filledServiceAttribute.serviceAttribute.create({
        name: serviceAttributeName,
        isRequired: true,
        order: 0,
        notice: '',
      })
    expect(serviceAttributeCreationStatus).toBe(EDbStatus.OK)

    // TODO заменить clientId на orderId
    const { status } = await filledServiceAttribute.create({
      clientId,
      orderId: '',
      value,
      serviceAttributeId,
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
    expect.assertions(1)
    const filledServiceAttribute = new FilledServiceAttribute()
    const model = await getFilledServiceAttributeByValue(filledServiceAttribute, updatedValue)
    if (!model) return

    const client = await filledServiceAttribute.getClient(model.id)
    if (client === EDbStatus.NOT_FOUND) return

    const user = await filledServiceAttribute.client.getUser(client.id)
    if (user === EDbStatus.NOT_FOUND) return

    expect(user.telegramId).toBe(telegramId)
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
    dbClient.deleteNamespace(filledServiceAttribute.client.modelNamespace)
    dbClient.deleteNamespace(filledServiceAttribute.client.user.modelNamespace)
    dbClient.deleteNamespace(filledServiceAttribute.serviceAttribute.modelNamespace)
  })
})
