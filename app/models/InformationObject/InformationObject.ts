import uniq from 'lodash/uniq'
import without from 'lodash/without'
import { v4 as uuid } from 'uuid'
import { CrudOperations } from '../../db/models'
import { EDbStatus } from '../../db/types'
import { Provider } from '../Provider/Provider'
import { IInformationObjectImage, IInformationObjectModel } from './types'

export class InformationObject extends CrudOperations<IInformationObjectModel> {
  constructor() {
    super({ namespace: 'bot', modelName: 'informationObject' })
  }

  get provider() {
    return new Provider()
  }

  getProvider = async (id: IInformationObjectModel['id']) => {
    const informationObjectModel = await this.read(id)
    if (!informationObjectModel) return EDbStatus.NOT_FOUND

    const providerModel = await this.provider.read(informationObjectModel.providerId)
    if (!providerModel) return EDbStatus.NOT_FOUND

    return providerModel
  }

  create = async (model: Omit<IInformationObjectModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { providerId } = model

    const provider = await this.provider.read(providerId)

    if (!provider) {
      return {
        id: '',
        status: EDbStatus.NOT_FOUND,
        message: `Can't find provider with id ${providerId}`,
      }
    }

    const creationState = await super.create(model)
    if (creationState.status !== EDbStatus.OK) return creationState

    const updatingProviderStatus = await this.provider.update(providerId, {
      informationObjectsIds: uniq([...(provider.informationObjectsIds || []), creationState.id]),
    })

    if (updatingProviderStatus !== EDbStatus.OK) {
      await this.delete(creationState.id)

      return {
        id: '',
        status: updatingProviderStatus,
        message: `Can't bind information object to provider with id ${providerId}`,
      }
    }

    return creationState
  }

  delete = async (id: IInformationObjectModel['id']) => {
    const informationObject = await this.read(id)
    if (!informationObject) return EDbStatus.NOT_FOUND

    const provider = await this.provider.read(informationObject.providerId)

    if (!provider) return EDbStatus.ERROR

    const updatingProviderStatus = await this.provider.update(informationObject.providerId, {
      informationObjectsIds: without(provider.informationObjectsIds || [], id),
    })

    if (updatingProviderStatus !== EDbStatus.OK) return updatingProviderStatus

    return await super.delete(id)
  }

  addImagesToGallery = async (
    id: IInformationObjectModel['id'],
    urls: IInformationObjectImage['url'][],
  ) => {
    const informationObject = await this.read(id)
    if (!informationObject) return EDbStatus.NOT_FOUND

    return await this.update(id, {
      gallery: uniq([
        ...(informationObject.gallery || []),
        ...urls.map(url => ({ id: uuid(), url })),
      ]),
    })
  }

  removeImagesFromGallery = async (
    id: IInformationObjectModel['id'],
    imagesIds: IInformationObjectImage['id'][],
  ) => {
    const informationObject = await this.read(id)
    if (!informationObject) return EDbStatus.NOT_FOUND

    return await this.update(id, {
      gallery: informationObject.gallery?.filter(image => !imagesIds.includes(image.id)) ?? [],
    })
  }
}
