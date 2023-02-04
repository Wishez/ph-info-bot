import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IServiceCategoryModel } from '../../models/ServiceCategory/types'
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

  @Field(() => [String], { nullable: true })
  subcategoriesIds?: string[]
}

@ObjectType()
export class ServiceCategorySchema implements Omit<IServiceCategoryModel, 'subcategoriesIds'> {
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

  @Field(() => [ServiceCategoryListSchema], { nullable: true })
  subcategories?: ServiceCategoryListSchema[]
}

@InputType()
export class ServiceCategoryCreation implements Omit<IServiceCategoryModel, 'id' | 'createdAt'> {
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
