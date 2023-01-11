import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Service } from '../Service/Service'
import { IServiceModel } from '../Service/types'
import { IUserModel } from '../User/types'
import { User } from '../User/User'
import { IProviderModel } from './types'

export class Provider extends CrudOperations<IProviderModel> {
  user = new User()
  service = new Service()

  constructor() {
    super({ namespace: 'bot', modelName: 'provider' })
  }

  getUser = async (id: IProviderModel['id']) => {
    const providerModel = await this.read(id)
    if (!providerModel) return EDbStatus.NOT_FOUND

    const userModel = await this.user.read(providerModel.userId)
    if (!userModel) return EDbStatus.NOT_FOUND

    return userModel
  }

  getProviderByUserTelegramId = async (
    telegramId: IUserModel['telegramId'],
  ): Promise<EDbStatus.NOT_FOUND | IProviderModel> => {
    const userModel = await this.user.getUserByTelegramId(telegramId)
    if (!userModel) return EDbStatus.NOT_FOUND

    const providers = await this.readAll()
    if (!providers) return EDbStatus.NOT_FOUND

    const provider = Object.values(providers).find(model => model.userId === userModel.id)

    if (!provider) return EDbStatus.NOT_FOUND

    return provider
  }

  getProvidedServices = async (providerId: IProviderModel['id']) => {
    const provider = await this.read(providerId)

    if (!provider) return EDbStatus.NOT_FOUND

    const services = await this.service.getServicesByIds(provider.servicesIds)

    if (services === EDbStatus.NOT_FOUND) return EDbStatus.NOT_FOUND

    return services
  }

  bindServices = async (
    providerId: IProviderModel['id'],
    servicesIds: IProviderModel['servicesIds'],
  ) => {
    const provider = await this.read(providerId)

    if (!provider) return EDbStatus.NOT_FOUND

    const services = await this.service.getServicesByIds(servicesIds)

    if (services === EDbStatus.NOT_FOUND) return EDbStatus.NOT_FOUND

    return await this.update(providerId, {
      servicesIds: uniq([...Object.keys(services), ...provider.servicesIds]),
    })
  }

  unmountService = async (providerId: IProviderModel['id'], serviceId: IServiceModel['id']) => {
    const provider = await this.read(providerId)

    if (!provider) return EDbStatus.NOT_FOUND

    return await this.update(providerId, {
      servicesIds: without(provider.servicesIds, serviceId),
    })
  }
}
