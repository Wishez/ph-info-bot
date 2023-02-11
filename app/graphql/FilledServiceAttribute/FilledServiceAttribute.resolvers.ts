import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { FilledServiceAttribute } from '../../models/FilledServiceAttribute/FilledServiceAttribute'
import { IFilledServiceAttributeModel } from '../../models/FilledServiceAttribute/types'
import { ServiceAttributeSchema } from '../ServiceAttribute/ServiceAttribute.schema'
import {
  FilledServiceAttributeCreation,
  FilledServiceAttributeSchema,
  FilledServiceAttributeUpdating,
} from './FilledServiceAttribute.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class FilledServiceAttributeResolver {
  static filledServiceAttribute = new FilledServiceAttribute()

  @Query(() => [FilledServiceAttributeSchema])
  async filledServiceAttributes(): Promise<FilledServiceAttributeSchema[]> {
    const filledServiceAttributes =
      await FilledServiceAttributeResolver.filledServiceAttribute.readAll()
    if (!filledServiceAttributes) return []

    return await Promise.all(
      Object.values(filledServiceAttributes).map(async filledServiceAttribute => {
        const serviceAttribute =
          (await FilledServiceAttributeResolver.filledServiceAttribute.getAttribute(
            filledServiceAttribute.id,
          )) as ServiceAttributeSchema

        return {
          ...filledServiceAttribute,
          serviceAttribute,
        }
      }),
    )
  }

  @Query(() => FilledServiceAttributeSchema || GraphQLError)
  async filledServiceAttribute(
    @Arg('id') id: string,
  ): Promise<FilledServiceAttributeSchema | GraphQLError> {
    const filledServiceAttribute = await FilledServiceAttributeResolver.filledServiceAttribute.read(
      id,
    )

    if (!filledServiceAttribute) {
      return new GraphQLError(`FilledServiceAttribute with ${id} is not found`)
    }

    const serviceAttribute =
      await FilledServiceAttributeResolver.filledServiceAttribute.getAttribute(
        filledServiceAttribute.id,
      )

    if (serviceAttribute === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`Service attribute of Filled attribute with ${id} is not found`)
    }

    return {
      ...filledServiceAttribute,
      serviceAttribute,
    }
  }

  @Mutation(() => String || GraphQLError)
  async createFilledServiceAttribute(
    @Arg('filledServiceAttributeInfo') filledServiceAttributeInfo: FilledServiceAttributeCreation,
  ): Promise<GraphQLError | IFilledServiceAttributeModel['id']> {
    const { status, id } = await FilledServiceAttributeResolver.filledServiceAttribute.create(
      filledServiceAttributeInfo,
    )

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create filledServiceAttribute")
  }

  @Mutation(() => Boolean)
  async deleteFilledServiceAttribute(
    @Arg('filledServiceAttributeId') filledServiceAttributeId: string,
  ): Promise<boolean> {
    const status = await FilledServiceAttributeResolver.filledServiceAttribute.delete(
      filledServiceAttributeId,
    )

    return status === EDbStatus.OK
  }

  @Mutation(() => FilledServiceAttributeSchema || false)
  async updateFilledServiceAttribute(
    @Arg('filledServiceAttributeId') filledServiceAttributeId: string,
    @Arg('filledServiceAttributeInfo') filledServiceAttributeInfo: FilledServiceAttributeUpdating,
  ): Promise<FilledServiceAttributeSchema | false> {
    const status = await FilledServiceAttributeResolver.filledServiceAttribute.update(
      filledServiceAttributeId,
      filledServiceAttributeInfo,
    )
    const filledServiceAttributeResolver = new FilledServiceAttributeResolver()
    const nextFilledServiceAttribute = await filledServiceAttributeResolver.filledServiceAttribute(
      filledServiceAttributeId,
    )

    if (status !== EDbStatus.OK || nextFilledServiceAttribute instanceof GraphQLError) {
      return false
    }

    return nextFilledServiceAttribute
  }
}
