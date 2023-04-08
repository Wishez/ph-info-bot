import { IsArray } from 'class-validator'
import typeQl from 'type-graphql'
import {
  IInformationObjectImage,
  IInformationObjectModel,
} from '../../models/InformationObject/types'
import { ProviderSchema } from '../Provider/Provider.schema'
import { IsProviderExisted } from '../Provider/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class InformationObjectImageSchema implements IInformationObjectImage {
  @Field()
  id!: string
  @Field()
  url!: string
}

@ObjectType()
export class InformationObjectListSchema implements IInformationObjectModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  description!: string

  @Field()
  name!: string

  @Field(() => [InformationObjectImageSchema])
  gallery!: InformationObjectImageSchema[]

  @Field()
  providerId!: string
}

@ObjectType()
export class InformationObjectSchema implements Omit<IInformationObjectModel, 'providerId'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  description!: string

  @Field()
  name!: string

  @Field(() => [InformationObjectImageSchema])
  gallery!: InformationObjectImageSchema[]

  @Field(() => ProviderSchema)
  provider!: ProviderSchema
}

type TInformationObjectCreation = Omit<
  IInformationObjectModel,
  'id' | 'createdAt' | 'updatedAt' | 'gallery'
>
@InputType()
export class InformationObjectCreation implements TInformationObjectCreation {
  @Field()
  description!: string

  @Field()
  name!: string

  @Field()
  @IsProviderExisted()
  providerId!: string
}

type TInformationObjectUpdating = Omit<
  IInformationObjectModel,
  'id' | 'createdAt' | 'updatedAt' | 'gallery' | 'providerId'
>
@InputType()
export class InformationObjectUpdating implements TInformationObjectUpdating {
  @Field()
  description!: string

  @Field()
  name!: string
}

@InputType()
export class AddingImagesToGalleryPayload {
  @Field(() => [String])
  @IsArray()
  urls!: string[]
}

@InputType()
export class RemovingImagesFromGalleryPayload {
  @Field(() => [String])
  @IsArray()
  imagesIds!: string[]
}
