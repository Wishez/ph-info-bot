import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IProviderModel } from '../../models/Provider/types'
import { ServiceSchema } from '../Service/Service.schema'
import { IsServiceExisted } from '../Service/validators'
import { UserSchema } from '../User/User.schema'
import { IsUserExists } from '../User/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ProviderListSchema implements Omit<IProviderModel, 'userId'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  description!: string

  @Field()
  serviceId!: string

  @Field(() => UserSchema)
  user!: UserSchema
}

@ObjectType()
export class ProviderSchema implements Omit<IProviderModel, 'userId' | 'serviceId'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  description!: string

  @Field(() => ServiceSchema)
  service!: ServiceSchema

  @Field(() => UserSchema)
  user!: UserSchema
}

@InputType()
export class ProviderCreation implements Omit<IProviderModel, 'id' | 'createdAt'> {
  @Field()
  @IsServiceExisted({
    message: "Service with id $value isn't existed",
  })
  serviceId!: string

  @Field()
  @IsUserExists({
    message: "User with id $value isn't existed",
  })
  userId!: string

  @Field()
  @IsString()
  description!: string
}

@InputType()
export class ProviderUpdating {
  @Field({ nullable: true })
  @IsUserExists({
    message: "User with id $value isn't existed",
  })
  userId?: string

  @Field({ nullable: true })
  @IsString()
  description?: string
}
