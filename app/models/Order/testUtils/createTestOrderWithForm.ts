import { EDbStatus } from '../../../db/types'
import { EClientRank } from '../../Client/types/EClientRank'
import { EServiceType } from '../../Service/types'
import { IUserModel } from '../../User/types'
import { Order } from '../Order'

interface ICreatingTestOrderOptions {
  userName: string
  clientTelegramId: IUserModel['telegramId']
  providerTelegramId: IUserModel['telegramId']
  description: string
  attributeName: string
  serviceName: string
  categoryName: string
}

export const createTestOrderWithForm = async (options: ICreatingTestOrderOptions) => {
  const {
    userName,
    clientTelegramId,
    providerTelegramId,
    description,
    attributeName,
    serviceName,
    categoryName,
  } = options
  const order = new Order()
  const { status: providerUserCreationStatus, id: providerUserId } =
    await order.provider.user.create({
      name: userName,
      telegramId: providerTelegramId,
    })
  expect(providerUserCreationStatus).toBe(EDbStatus.OK)

  const { status: clientUserCreationStatus, id: clientUserId } = await order.client.user.create({
    name: userName,
    telegramId: clientTelegramId,
  })
  expect(clientUserCreationStatus).toBe(EDbStatus.OK)

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
    providersIds: [],
    serviceType: EServiceType.FORM,
  })
  expect(serviceCreationStatus).toBe(EDbStatus.OK)

  const { status: providerCreationStatus, id: providerId } = await order.provider.create({
    userId: providerUserId,
    description,
    serviceId,
  })
  expect(providerCreationStatus).toBe(EDbStatus.OK)

  const { status: clientCreationStatus, id: clientId } = await order.client.create({
    userId: clientUserId,
    rank: EClientRank.NEW,
  })
  expect(clientCreationStatus).toBe(EDbStatus.OK)

  const { status, id } = await order.create({
    serviceId,
    clientId,
    providerId,
  })

  expect(status).toBe(EDbStatus.OK)

  return {
    orderId: id,
    clientId,
    providerId,
    serviceId,
    attributeId,
    categoryId,
    clientUserId,
    providerUserId,
  }
}
