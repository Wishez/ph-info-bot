import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IServiceCategoryModel } from '../../models/ServiceCategory/types'
import { ServiceListSchema } from '../Service/Service.schema'
import { AreCategoriesExisted } from './validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ServiceCategoryListSchema implements IServiceCategoryModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  description!: string

  @Field()
  createdAt!: string

  @Field()
  name!: string

  @Field({ nullable: true })
  parentId?: string

  @Field(() => [String], { nullable: true })
  subcategoriesIds?: string[]

  @Field(() => [String])
  servicesIds!: string[]
}

type TServiceCategorySchema = Omit<IServiceCategoryModel, 'subcategoriesIds' | 'servicesIds'>
@ObjectType()
export class ServiceCategorySchema implements TServiceCategorySchema {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  description!: string

  @Field()
  createdAt!: string

  @Field()
  name!: string

  @Field({ nullable: true })
  parentId?: string

  @Field(() => [ServiceCategoryListSchema], { nullable: true })
  subcategories?: ServiceCategoryListSchema[]

  @Field(() => [ServiceListSchema])
  services!: ServiceListSchema[]
}

type TServiceCategoryCreation = Omit<IServiceCategoryModel, 'id' | 'createdAt' | 'servicesIds'>
@InputType()
export class ServiceCategoryCreation implements TServiceCategoryCreation {
  @Field()
  @IsString()
  name!: string

  @Field()
  @IsString()
  description!: string
}

@InputType()
export class ServiceCategoryUpdating {
  @Field({ nullable: true })
  @IsString()
  name?: string

  @Field({ nullable: true })
  @IsString()
  description?: string
}

@InputType()
export class ServiceCategoryBindingSubcategories {
  @Field(() => [String])
  @AreCategoriesExisted({
    message: 'One of category $value is not existed',
  })
  subcategoriesIds!: string[]
}

@InputType()
export class ServiceCategoryUnmountingSubcategories {
  @Field(() => [String])
  @AreCategoriesExisted({
    message: 'One of category $value is not existed',
  })
  subcategoriesIds!: string[]
}
