import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { InformationObject } from '../../models/InformationObject/InformationObject'
import { IInformationObjectModel } from '../../models/InformationObject/types'
import { ProviderResolver } from '../Provider/Provider.resolvers'
import { ProviderSchema } from '../Provider/Provider.schema'
import {
  AddingImagesToGalleryPayload,
  InformationObjectCreation,
  InformationObjectListSchema,
  InformationObjectSchema,
  InformationObjectUpdating,
  RemovingImagesFromGalleryPayload,
} from './InformationObject.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class InformationObjectResolver {
  static informationObject = new InformationObject()
  static providerResolver = new ProviderResolver()

  @Query(() => [InformationObjectListSchema])
  async informationObjects(): Promise<InformationObjectListSchema[]> {
    const informationObjects = await InformationObjectResolver.informationObject.readAll()
    if (!informationObjects) return []

    return await Promise.all(
      Object.values(informationObjects).map(async informationObject => {
        const provider = (await InformationObjectResolver.providerResolver.provider(
          informationObject.providerId,
        )) as ProviderSchema

        return {
          ...informationObject,
          provider,
        }
      }),
    )
  }

  @Query(() => InformationObjectSchema || GraphQLError)
  async informationObject(@Arg('id') id: string): Promise<InformationObjectSchema | GraphQLError> {
    const informationObject = await InformationObjectResolver.informationObject.read(id)

    if (!informationObject) {
      return new GraphQLError(`InformationObject with id ${id} is not found`)
    }

    const provider = await InformationObjectResolver.providerResolver.provider(
      informationObject.providerId,
    )

    if (provider instanceof GraphQLError) {
      return new GraphQLError(`Provider is not found`)
    }

    return {
      ...informationObject,
      provider,
    }
  }

  @Mutation(() => String || GraphQLError)
  async createInformationObject(
    @Arg('informationObjectInfo') informationObjectInfo: InformationObjectCreation,
  ): Promise<GraphQLError | IInformationObjectModel['id']> {
    const { status, id } = await InformationObjectResolver.informationObject.create({
      ...informationObjectInfo,
      gallery: [],
    })

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create informationObject")
  }

  @Mutation(() => InformationObjectSchema || GraphQLError)
  async updateInformationObject(
    @Arg('id') id: string,
    @Arg('informationObjectInfo') informationObjectInfo: InformationObjectUpdating,
  ): Promise<GraphQLError | InformationObjectSchema> {
    const status = await InformationObjectResolver.informationObject.update(
      id,
      informationObjectInfo,
    )

    const informationObjectResolver = new InformationObjectResolver()
    const nextInformationObject = await informationObjectResolver.informationObject(id)

    if (status !== EDbStatus.OK || nextInformationObject instanceof GraphQLError) {
      return new GraphQLError("Can't update informationObject")
    }

    return nextInformationObject
  }

  @Mutation(() => Boolean)
  async deleteInformationObject(@Arg('id') id: string): Promise<boolean> {
    const status = await InformationObjectResolver.informationObject.delete(id)

    return status === EDbStatus.OK
  }

  @Mutation(() => InformationObjectSchema || false)
  async addImagesToGallery(
    @Arg('id') id: string,
    @Arg('informationObjectInfo') informationObjectInfo: AddingImagesToGalleryPayload,
  ): Promise<InformationObjectSchema | false> {
    const addingMessageStatus =
      await InformationObjectResolver.informationObject.addImagesToGallery(
        id,
        informationObjectInfo.urls,
      )
    const informationObjectResolver = new InformationObjectResolver()
    const nextInformationObject = await informationObjectResolver.informationObject(id)

    if (addingMessageStatus !== EDbStatus.OK || nextInformationObject instanceof GraphQLError) {
      return false
    }

    return nextInformationObject
  }

  @Mutation(() => InformationObjectSchema || false)
  async removeImagesFromGallery(
    @Arg('id') id: string,
    @Arg('informationObjectInfo') informationObjectInfo: RemovingImagesFromGalleryPayload,
  ): Promise<InformationObjectSchema | false> {
    const addingMessageStatus =
      await InformationObjectResolver.informationObject.removeImagesFromGallery(
        id,
        informationObjectInfo.imagesIds,
      )
    const informationObjectResolver = new InformationObjectResolver()
    const nextInformationObject = await informationObjectResolver.informationObject(id)

    if (addingMessageStatus !== EDbStatus.OK || nextInformationObject instanceof GraphQLError) {
      return false
    }

    return nextInformationObject
  }
}
