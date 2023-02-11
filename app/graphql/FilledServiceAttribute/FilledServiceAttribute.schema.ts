import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IFilledServiceAttributeModel } from '../../models/FilledServiceAttribute/types'
import { IsServiceExisted } from '../Service/validators'
import {
  ServiceAttributeListSchema,
  ServiceAttributeSchema,
} from '../ServiceAttribute/ServiceAttribute.schema'

const { Field, InputType, ObjectType, ID } = typeQl

type TFilledServiceAttributeListSchema = Omit<IFilledServiceAttributeModel, 'serviceAttributeId'>
@ObjectType()
export class FilledServiceAttributeListSchema implements TFilledServiceAttributeListSchema {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  value!: string

  // TODO подставить заказ
  @Field()
  orderId!: string

  @Field()
  serviceAttribute!: ServiceAttributeListSchema
}

type TFilledServiceAttributeSchema = Omit<IFilledServiceAttributeModel, 'serviceAttributeId'>
@ObjectType()
export class FilledServiceAttributeSchema implements TFilledServiceAttributeSchema {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  value!: string

  // TODO подставить заказ
  @Field()
  orderId!: string

  @Field(() => ServiceAttributeSchema)
  serviceAttribute!: ServiceAttributeSchema
}

type TFilledServiceAttributeCreation = Omit<
  IFilledServiceAttributeModel,
  'id' | 'createdAt' | 'servicesIds'
>
@InputType()
export class FilledServiceAttributeCreation implements TFilledServiceAttributeCreation {
  // TODO подставить валидацию заказа
  @Field()
  @IsString()
  orderId!: string

  @Field()
  @IsString()
  value!: string

  @Field()
  @IsServiceExisted()
  serviceAttributeId!: string
}

@InputType()
export class FilledServiceAttributeUpdating {
  @Field()
  @IsString()
  value!: string
}
