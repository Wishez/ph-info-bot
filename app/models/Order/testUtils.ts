import { EDbStatus } from '../../db/types'
import { EClientRank } from '../Client/types/EClientRank'
import { Order } from './Order'

interface ICreatingTestOrderOptions {
  userName: string
  telegramId: string
  description: string
  attributeName: string
  serviceName: string
  categoryName: string
}

export const createTestOrder = async (options: ICreatingTestOrderOptions) => {
  const { userName, telegramId, description, attributeName, serviceName, categoryName } = options
  const order = new Order()
  const { status: userCreationStatus, id: userId } = await order.provider.user.create({
    name: userName,
    telegramId,
  })
  expect(userCreationStatus).toBe(EDbStatus.OK)

  const { status: categoryCreationStatus, id: categoryId } =
    await order.service.serviceCategory.create({
      name: categoryName,
      description,
    })
  expect(categoryCreationStatus).toBe(EDbStatus.OK)

  const { status: attributeCreationStatus, id: attributeId } =
    await order.service.serviceAttribute.create({
      name: attributeName,
      notice: description,
      isRequired: true,
      order: 0,
    })
  expect(attributeCreationStatus).toBe(EDbStatus.OK)

  const { status: serviceCreationStatus, id: serviceId } = await order.service.create({
    name: serviceName,
    categoryId,
    description,
    attributesIds: [attributeId],
  })
  expect(serviceCreationStatus).toBe(EDbStatus.OK)

  const { status: providerCreationStatus, id: providerId } = await order.provider.create({
    userId,
    description,
    servicesIds: [serviceId],
  })
  expect(providerCreationStatus).toBe(EDbStatus.OK)

  const { status: clientCreationStatus, id: clientId } = await order.client.create({
    userId,
    rank: EClientRank.NEW,
  })
  expect(clientCreationStatus).toBe(EDbStatus.OK)

  const { status, id } = await order.create({
    serviceId,
    clientId,
    providerId,
    // TODO добавить chatId
    chatId: '',
  })

  expect(status).toBe(EDbStatus.OK)

  return {
    orderId: id,
    clientId,
    providerId,
    serviceId,
    attributeId,
    categoryId,
    userId,
  }
}
