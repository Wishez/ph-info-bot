import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { dbClient } from '../../../db'
import { EDbStatus } from '../../../db/types'
import { createTestProvider } from '../../Provider/testUtils'
import { IUserModel } from '../../User/types'
import { InformationObject } from '../InformationObject'
import { IInformationObjectImage } from '../types'
import { getInformationObjectByName } from '../utils'

describe('InformationObject', () => {
  test('init', () => {
    const informationObject = new InformationObject()
    expect('read' in informationObject).toBeTruthy()
    expect('readAll' in informationObject).toBeTruthy()
    expect('create' in informationObject).toBeTruthy()
    expect('update' in informationObject).toBeTruthy()
    expect('addImagesToGallery' in informationObject).toBeTruthy()
    expect('removeImagesFromGallery' in informationObject).toBeTruthy()
    expect('delete' in informationObject).toBeTruthy()
    expect(informationObject.modelNamespace.startsWith('bot.informationObject')).toBeTruthy()
  })

  const name = uniqueId('objectName')
  const description = uniqueId('informationObjectDescription')
  const updatedDescription = uniqueId('informationObjectDescription')
  const providerName = uniqueId('providerName')
  const serviceName = uniqueId('serviceName')
  const categoryName = uniqueId('categoryName')
  const providerTelegramId: IUserModel['telegramId'] = Math.round(Math.random() * 10000000)
  test('create', async () => {
    expect.assertions(8)
    const informationObject = new InformationObject()
    const creationState = await createTestProvider({
      name: providerName,
      description,
      telegramId: providerTelegramId,
      serviceName,
      categoryName,
    })
    if (!creationState) return

    const { providerId } = creationState
    const model = await informationObject.create({
      providerId,
      gallery: [],
      name,
      description,
    })
    expect(model.status).toBe(EDbStatus.OK)
    const provider = await informationObject.provider.read(providerId)
    if (!provider) return
    expect(provider.informationObjectsIds?.[0]).toBe(model.id)
  })

  test('read all', async () => {
    expect.assertions(2)
    const informationObject = new InformationObject()
    const models = await informationObject.readAll()

    expect(models).toBeInstanceOf(Object)
    expect(!isEmpty(models)).toBeTruthy()
  })

  test('read', async () => {
    expect.assertions(5)
    const informationObject = new InformationObject()

    const model = await getInformationObjectByName(name, informationObject)
    if (!model) return

    expect(typeof model.id).toBe('string')
    expect(typeof model.providerId).toBe('string')
    expect(typeof model.createdAt).toBe('string')
    expect(model.name).toBe(name)
    expect(model.description).toBe(description)
  })

  test('update', async () => {
    expect.assertions(2)
    const informationObject = new InformationObject()
    const model = await getInformationObjectByName(name, informationObject)
    if (!model) return

    const status = await informationObject.update(model.id, { description: updatedDescription })

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await informationObject.read(model.id)

    expect(nextModel?.description).toBe(updatedDescription)
  })

  const imagesUrls: IInformationObjectImage['url'][] = [uniqueId('imageUrl'), uniqueId('imageUrl')]
  test('addImagesToGallery', async () => {
    expect.assertions(5)
    const informationObject = new InformationObject()
    const model = await getInformationObjectByName(name, informationObject)
    if (!model) return

    const status = await informationObject.addImagesToGallery(model.id, imagesUrls)

    expect(status).toBe(EDbStatus.OK)

    const nextModel = await informationObject.read(model.id)
    if (!nextModel) return

    expect(Array.isArray(nextModel.gallery)).toBeTruthy()
    expect(nextModel.gallery.length === imagesUrls.length).toBeTruthy()
    const firstImage = nextModel.gallery[0]
    expect(firstImage?.url).toBe(imagesUrls[0])
    expect(typeof firstImage?.id).toBe('string')
  })

  test('removeImagesFromGallery', async () => {
    expect.assertions(4)
    const informationObject = new InformationObject()
    const model = await getInformationObjectByName(name, informationObject)
    if (!model) return

    const firstImageId = model.gallery[0]?.id
    if (!firstImageId) return

    const status = await informationObject.removeImagesFromGallery(model.id, [firstImageId])
    expect(status).toBe(EDbStatus.OK)

    const nextModel = await informationObject.read(model.id)
    if (!nextModel) return

    expect(nextModel?.gallery.length === imagesUrls.length - 1).toBeTruthy()
    expect(nextModel.gallery[0]?.url).toBe(imagesUrls[1])
    expect(
      nextModel.gallery.find(galleryImage => galleryImage.url === imagesUrls[0]),
    ).toBeUndefined()
  })

  test('delete', async () => {
    expect.assertions(2)
    const informationObject = new InformationObject()
    const model = await getInformationObjectByName(name, informationObject)
    if (!model) return

    const status = await informationObject.delete(model.id)

    expect(status).toBe(EDbStatus.OK)

    const provider = await informationObject.provider.read(model.providerId)
    if (!provider) return

    expect(provider.informationObjectsIds?.includes(model.id)).toBeFalsy()
  })

  afterAll(() => {
    const informationObject = new InformationObject()
    dbClient.deleteNamespace(informationObject.modelNamespace)
    dbClient.deleteNamespace(informationObject.provider.modelNamespace)
    dbClient.deleteNamespace(informationObject.provider.service.modelNamespace)
    dbClient.deleteNamespace(informationObject.provider.service.serviceCategory.modelNamespace)
  })
})
