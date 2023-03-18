import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Service } from '../Service/Service'
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

  getProvidersByUserTelegramId = async (
    telegramId: IUserModel['telegramId'],
  ): Promise<EDbStatus.NOT_FOUND | IProviderModel[]> => {
    const userModel = await this.user.getUserByTelegramId(telegramId)
    if (!userModel) return EDbStatus.NOT_FOUND

    const providers = await this.readAll()
    if (!providers) return EDbStatus.NOT_FOUND

    const pickedUpProviders = Object.values(providers).filter(
      model => model.userId === userModel.id,
    )

    if (!pickedUpProviders.length) return EDbStatus.NOT_FOUND

    return pickedUpProviders
  }

  create = async (model: Omit<IProviderModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { userId, serviceId } = model

    const user = await this.user.read(userId)
    const service = await this.service.read(serviceId)

    if (!(service && user)) {
      return {
        id: '',
        status: EDbStatus.NOT_FOUND,
        message: "Can't find service or user",
      }
    }

    const creationState = await super.create(model)
    if (creationState.status !== EDbStatus.OK) return creationState

    await this.service.update(serviceId, {
      providersIds: uniq([...(service.providersIds || []), creationState.id]),
    })
    await this.user.update(userId, {
      providersIds: uniq([...(user.providersIds || []), creationState.id]),
    })

    return creationState
  }

  delete = async (id: IProviderModel['id']) => {
    const provider = await this.read(id)
    if (!provider) return EDbStatus.NOT_FOUND
    const service = await this.service.read(provider.serviceId)
    const user = await this.user.read(provider.userId)

    if (!(service && user)) return EDbStatus.ERROR

    await this.service.update(provider.serviceId, {
      providersIds: without(service.providersIds, id),
    })
    await this.user.update(provider.userId, {
      providersIds: without(service.providersIds, id),
    })

    return await super.delete(id)
  }

  getProvidedService = async (providerId: IProviderModel['id']) => {
    const provider = await this.read(providerId)

    if (!provider) return EDbStatus.NOT_FOUND

    const service = await this.service.read(provider.serviceId)

    if (!service) return EDbStatus.NOT_FOUND

    return service
  }
}
