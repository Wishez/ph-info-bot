import { IsBoolean, IsNumber, IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IServiceAttributeModel } from '../../models/ServiceAttribute/types'
import { ServiceSchema } from '../Service/Service.schema'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ServiceAttributeListSchema implements IServiceAttributeModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  notice!: string

  @Field()
  isRequired!: boolean

  @Field()
  name!: string

  @Field()
  order!: number

  @Field({ nullable: true })
  serviceId?: string
}

@ObjectType()
export class ServiceAttributeSchema implements IServiceAttributeModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  notice!: string

  @Field()
  isRequired!: boolean

  @Field()
  name!: string

  @Field()
  order!: number

  @Field(() => ServiceSchema, { nullable: true })
  service?: ServiceSchema
}

@InputType()
export class ServiceAttributeCreation implements Omit<IServiceAttributeModel, 'id' | 'createdAt'> {
  @Field()
  @IsString()
  notice!: string

  @Field()
  @IsBoolean()
  isRequired!: boolean

  @Field()
  @IsString()
  name!: string

  @Field()
  @IsNumber()
  order!: number
}

@InputType()
export class ServiceAttributeUpdating {
  @Field({ nullable: true })
  @IsString()
  notice?: string

  @Field({ nullable: true })
  @IsBoolean()
  isRequired?: boolean

  @Field({ nullable: true })
  @IsString()
  name?: string

  @Field({ nullable: true })
  @IsNumber()
  order?: number
}
