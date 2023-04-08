import { EDbStatus } from '../../../db/types'
import { EClientRank } from '../../Client/types/EClientRank'
import { IInformationObjectModel } from '../../InformationObject/types'
import { EServiceType, IServiceModel } from '../../Service/types'
import { IServiceCategoryModel } from '../../ServiceCategory/types'
import { IUserModel } from '../../User/types'
import { Order } from '../Order'

interface ICreatingTestOrderOptions {
  userName: IUserModel['name']
  clientTelegramId: IUserModel['telegramId']
  providerTelegramId: IUserModel['telegramId']
  description: string
  informationObjectName: IInformationObjectModel['name']
  serviceName: IServiceModel['name']
  categoryName: IServiceCategoryModel['name']
}

export const createTestOrderWithInformationObject = async (options: ICreatingTestOrderOptions) => {
  const {
    userName,
    clientTelegramId,
    providerTelegramId,
    description,
    informationObjectName,
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

  const { status: serviceCreationStatus, id: serviceId } = await order.service.create({
    name: serviceName,
    categoryId,
    description,
    providersIds: [],
    serviceType: EServiceType.PORTFOLIO,
  })
  expect(serviceCreationStatus).toBe(EDbStatus.OK)

  const { status: providerCreationStatus, id: providerId } = await order.provider.create({
    userId: providerUserId,
    description,
    serviceId,
  })
  expect(providerCreationStatus).toBe(EDbStatus.OK)

  const { status: informationInfoCreationStatus, id: informationObjectId } =
    await order.informationObject.create({
      name: informationObjectName,
      description,
      gallery: [],
      providerId,
    })
  expect(informationInfoCreationStatus).toBe(EDbStatus.OK)

  const { status: clientCreationStatus, id: clientId } = await order.client.create({
    userId: clientUserId,
    rank: EClientRank.NEW,
  })
  expect(clientCreationStatus).toBe(EDbStatus.OK)

  const { status, id } = await order.create({
    serviceId,
    clientId,
    providerId,
    informationObjectId,
  })

  expect(status).toBe(EDbStatus.OK)

  return {
    orderId: id,
    clientId,
    providerId,
    serviceId,
    informationObjectId,
    categoryId,
    clientUserId,
    providerUserId,
  }
}
