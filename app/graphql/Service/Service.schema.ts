import { IsEnum, IsString } from 'class-validator'
import typeQl from 'type-graphql'
import type { IServiceModel } from '../../models/Service/types'
import { EServiceType } from '../../models/Service/types'
import { ProviderListSchema } from '../Provider/Provider.schema'
import { ServiceAttributeSchema } from '../ServiceAttribute/ServiceAttribute.schema'
import { AreAttributesExisted } from '../ServiceAttribute/validators'
import { ServiceCategorySchema } from '../ServiceCategory/ServiceCategory.schema'
import { IsCategoryExisted } from '../ServiceCategory/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ServiceListSchema implements IServiceModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  name!: string

  @Field()
  description!: string

  @Field()
  categoryId!: string

  @Field({ nullable: true })
  image?: string

  @Field(() => [String], { nullable: true })
  attributesIds?: string[]

  @Field(() => [String])
  providersIds!: string[]

  @Field(() => String)
  serviceType!: EServiceType
}

export type TServiceSchema = Omit<IServiceModel, 'attributesIds' | 'categoryId' | 'providersIds'>
@ObjectType()
export class ServiceSchema implements TServiceSchema {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  name!: string

  @Field(() => String)
  serviceType!: EServiceType

  @Field()
  description!: string

  @Field(() => ServiceCategorySchema)
  category!: ServiceCategorySchema

  @Field({ nullable: true })
  image?: string

  @Field(() => [ServiceAttributeSchema], { nullable: true })
  attributes?: ServiceAttributeSchema[]

  @Field(() => [ProviderListSchema])
  providers!: ProviderListSchema[]
}

@InputType()
export class ServiceCreation {
  @Field()
  @IsString()
  name!: string

  @Field()
  @IsString()
  description!: string

  @Field()
  @IsCategoryExisted()
  categoryId!: string

  @Field({ nullable: true })
  @IsString()
  image?: string

  @Field(() => String)
  @IsEnum(EServiceType)
  serviceType!: EServiceType
}

@InputType()
export class ServiceUpdating {
  @Field({ nullable: true })
  @IsString()
  name?: string

  @Field({ nullable: true })
  @IsString()
  description?: string

  @Field({ nullable: true })
  @IsCategoryExisted()
  categoryId?: string

  @Field({ nullable: true })
  @IsString()
  image?: string

  @Field(() => String, { nullable: true })
  @IsEnum(EServiceType)
  serviceType?: EServiceType
}

@InputType()
export class ServiceBindingAttributes {
  @Field(() => [String])
  @AreAttributesExisted()
  attributesIds!: string[]
}

@InputType()
export class ServiceDeletingAttributes {
  @Field(() => [String])
  @AreAttributesExisted()
  attributesIds!: string[]
}

@InputType()
export class ServiceBindingCategory {
  @Field()
  @IsCategoryExisted()
  categoryId!: string
}
