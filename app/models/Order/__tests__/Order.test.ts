import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { IUserModel } from '../../User/types'
import { Order } from '../Order'
import { createTestOrderWithForm, createTestOrderWithInformationObject } from '../testUtils'
import { EOrderStatus } from '../types'

describe('Order', () => {
  test('init', () => {
    const order = new Order()
    expect('read' in order).toBeTruthy()
    expect('readAll' in order).toBeTruthy()
    expect('create' in order).toBeTruthy()
    expect('update' in order).toBeTruthy()
    expect('delete' in order).toBeTruthy()
    expect(order.modelNamespace.startsWith('bot.order')).toBeTruthy()
  })

  const clientTelegramIdForServiceWithForm = Math.round(Math.random() * 100000)
  const providerTelegramIdForServiceWithForm = Math.round(Math.random() * 100000)
  const clientTelegramIdForServiceWithPortfolio = Math.round(Math.random() * 100000)
  const providerTelegramIdForServiceWithPortfolio = Math.round(Math.random() * 100000)
  const userName = uniqueId('userName')
  const informationObjectName = uniqueId('informationObjectName')
  const description = uniqueId('description')
  const serviceNameWithForm = uniqueId('serviceName')
  const serviceNameWithPortfolio = uniqueId('serviceName')
  const categoryName = uniqueId('serviceCategoryName')
  const attributeName = uniqueId('serviceAttributeName')

  const getOrderForTest = async (clientTelegramId: IUserModel['telegramId']) => {
    const order = new Order()
    const model = await order.getOrdersByUserTelegramId(clientTelegramId)
    if (model === EDbStatus.NOT_FOUND) return
    const id = model[0]?.id
    if (!id) return

    return model[0]
  }

  test('create', async () => {
    expect.assertions(16)
    await createTestOrderWithForm({
      userName,
      clientTelegramId: clientTelegramIdForServiceWithForm,
      providerTelegramId: providerTelegramIdForServiceWithForm,
      description,
      categoryName,
      attributeName,
      serviceName: serviceNameWithForm,
    })
    await createTestOrderWithInformationObject({
      userName,
      clientTelegramId: clientTelegramIdForServiceWithPortfolio,
      providerTelegramId: providerTelegramIdForServiceWithPortfolio,
      description,
      categoryName,
      informationObjectName,
      serviceName: serviceNameWithPortfolio,
    })
  })

  test('read all', async () => {
    expect.assertions(2)
    const order = new Order()
    const models = await order.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(3)
    const order = new Order()

    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const orderModel = await order.read(model.id)
    if (!orderModel) return

    expect(orderModel.id).toBe(model.id)
    expect(orderModel.number).toBe(0)
    expect(orderModel.filledServicesAttributesIds.length).toBe(1)
  })

  test('update', async () => {
    expect.assertions(3)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const netProfit = 1000
    const status = await order.update(model.id, { status: EOrderStatus.COMPLETED, netProfit })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await order.read(model.id)

    expect(nextModel?.status).toBe(EOrderStatus.COMPLETED)
    expect(nextModel?.netProfit).toBe(netProfit)

    await order.update(model.id, { status: EOrderStatus.IN_PROCESS })
  })

  test('markAsPaidOfProvider', async () => {
    expect.assertions(2)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const status = await order.markAsPaidOfProvider(model.id)
    const nextModel = await order.read(model.id)
    expect(status).toBe(EDbStatus.OK)
    expect(nextModel?.status).toBe(EOrderStatus.PAID)

    await order.update(model.id, { status: EOrderStatus.IN_PROCESS })
  })

  test('getProvider', async () => {
    expect.assertions(1)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const provider = await order.getProvider(model.id)

    if (provider === EDbStatus.NOT_FOUND) return

    expect(provider.id).toBe(model.providerId)
  })

  test('getClient', async () => {
    expect.assertions(1)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const client = await order.getClient(model.id)

    if (client === EDbStatus.NOT_FOUND) return

    expect(client.id).toBe(model.clientId)
  })

  test('getService', async () => {
    expect.assertions(1)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const service = await order.getService(model.id)
    if (service === EDbStatus.NOT_FOUND) return

    expect(service.id).toBe(model.serviceId)
  })

  test('getFilledAttributes', async () => {
    expect.assertions(6)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const filledAttributes = await order.getFilledAttributes(model.id)
    expect(!isEmpty(filledAttributes)).toBeTruthy()
    if (filledAttributes === EDbStatus.NOT_FOUND) return

    const attributes = await order.filledServicesAttribute.getAttributesByFilledAttributesIds(
      map(filledAttributes, 'id'),
    )
    expect(!isEmpty(attributes)).toBeTruthy()
    if (attributes === EDbStatus.NOT_FOUND) return

    const filledAttribute = Object.values(filledAttributes)[0]
    expect(typeof filledAttribute).toBe('object')
    if (!filledAttribute) return

    const attribute = Object.values(attributes)[0]
    expect(typeof attribute).toBe('object')
    if (!attribute) return

    expect(filledAttribute.serviceAttribute.id).toBe(attribute.id)
    expect(filledAttribute.id).toBe(model.filledServicesAttributesIds[0])
  })

  test('completeOrder', async () => {
    expect.assertions(2)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const status = await order.completeOrder(model.id)
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await order.read(model.id)
    if (!nextModel) return

    expect(nextModel.status).toBe(EOrderStatus.COMPLETED)
  })

  test('cancelOrder', async () => {
    expect.assertions(3)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const cancelingReason = uniqueId('cancelingReason')
    const status = await order.cancelOrder(model.id, cancelingReason)
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await order.read(model.id)
    if (!nextModel) return

    expect(nextModel.status).toBe(EOrderStatus.CLOSED)
    expect(nextModel.cancelingReason).toBe(cancelingReason)
  })

  test('getOrderInformationObject', async () => {
    expect.assertions(2)
    const order = new Order()
    const modelWithForm = await getOrderForTest(clientTelegramIdForServiceWithForm)
    const modelWithInformationObject = await getOrderForTest(
      clientTelegramIdForServiceWithPortfolio,
    )
    if (!(modelWithForm && modelWithInformationObject)) return

    const informationObjectOfServiceWithFormType = await order.getOrderInformationObject(
      modelWithForm.id,
    )
    expect(informationObjectOfServiceWithFormType).toBe(EDbStatus.NOT_FOUND)

    const informationObjectOfServiceWithPortfolioType = await order.getOrderInformationObject(
      modelWithInformationObject.id,
    )
    if (informationObjectOfServiceWithPortfolioType === EDbStatus.NOT_FOUND) return

    expect(informationObjectOfServiceWithPortfolioType.name).toBe(informationObjectName)
  })

  test('delete', async () => {
    expect.assertions(1)
    const order = new Order()
    const model = await getOrderForTest(clientTelegramIdForServiceWithForm)
    if (!model) return

    const status = await order.delete(model.id)

    expect(status).toBe(EDbStatus.OK)
  })

  afterAll(() => {
    const order = new Order()
    dbClient.deleteNamespace(order.modelNamespace)
    dbClient.deleteNamespace(order.chat.modelNamespace)
    dbClient.deleteNamespace(order.client.user.modelNamespace)
    dbClient.deleteNamespace(order.client.modelNamespace)
    dbClient.deleteNamespace(order.provider.modelNamespace)
    dbClient.deleteNamespace(order.service.modelNamespace)
    dbClient.deleteNamespace(order.informationObject.modelNamespace)
    dbClient.deleteNamespace(order.service.serviceCategory.modelNamespace)
    dbClient.deleteNamespace(order.filledServicesAttribute.modelNamespace)
    dbClient.deleteNamespace(order.filledServicesAttribute.serviceAttribute.modelNamespace)
  })
})
