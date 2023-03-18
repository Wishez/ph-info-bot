import { EDbStatus } from '../../db/types'
import { IUserModel } from '../User/types'
import { Provider } from './Provider'

interface ICreationTestProviderOptions {
  name: string
  telegramId: IUserModel['telegramId']
  description: string
  serviceName: string
  categoryName: string
}
export const createTestProvider = async ({
  name,
  telegramId,
  description,
  serviceName,
  categoryName,
}: ICreationTestProviderOptions) => {
  const provider = new Provider()
  const { status: userCreationStatus, id: userId } = await provider.user.create({
    name,
    telegramId,
  })
  expect(userCreationStatus).toBe(EDbStatus.OK)

  const { status: categoryCreationStatus, id: categoryId } =
    await provider.service.serviceCategory.create({ name: categoryName, description })
  expect(categoryCreationStatus).toBe(EDbStatus.OK)

  const { status: serviceCreationStatus, id: serviceId } = await provider.service.create({
    name: serviceName,
    description,
    categoryId,
    attributesIds: [],
    providersIds: [],
  })
  expect(serviceCreationStatus).toBe(EDbStatus.OK)

  const { status, id: providerId } = await provider.create({ userId, serviceId, description })
  expect(status).toBe(EDbStatus.OK)

  const user = await provider.user.read(userId)
  const service = await provider.service.read(serviceId)
  if (!(user && service)) return

  expect(user.providersIds?.includes(providerId)).toBeTruthy()
  expect(service.providersIds?.includes(providerId)).toBeTruthy()

  return {
    providerId,
    userId,
    serviceId,
    categoryId,
  }
}
