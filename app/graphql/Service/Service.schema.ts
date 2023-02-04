import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IServiceModel } from '../../models/Service/types'
import { ServiceAttributeListSchema } from '../ServiceAttribute/ServiceAttributeListSchema'
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

  @Field(() => [String])
  attributesIds!: string[]
}

@ObjectType()
export class ServiceSchema implements Omit<IServiceModel, 'attributesIds' | 'categoryId'> {
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

  @Field(() => ServiceCategorySchema)
  category!: ServiceCategorySchema

  @Field({ nullable: true })
  image?: string

  @Field(() => [ServiceAttributeListSchema])
  attributes!: ServiceAttributeListSchema[]
}

@InputType()
export class ServiceCreation implements Omit<IServiceModel, 'id' | 'createdAt'> {
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

  @Field(() => [String])
  @AreAttributesExisted()
  attributesIds!: string[]
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

  @Field(() => [String], { nullable: true })
  @AreAttributesExisted()
  attributesIds?: string[]
}

@InputType()
export class ServiceBindingAttributes {
  @Field(() => [String])
  @AreAttributesExisted()
  attributesIds!: string[]
}

@InputType()
export class ServiceDeletingAttribute {
  @Field()
  @IsString()
  attributeId!: string
}

@InputType()
export class ServiceBindingCategory {
  @Field()
  @IsCategoryExisted()
  categoryId!: string
}
