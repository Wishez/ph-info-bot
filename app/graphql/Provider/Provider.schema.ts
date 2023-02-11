import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IProviderModel } from '../../models/Provider/types'
import { ServiceListSchema } from '../Service/Service.schema'
import { AreServicesExisted } from '../Service/validators'
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

  @Field(() => [String])
  servicesIds!: string[]

  @Field(() => UserSchema)
  user!: UserSchema
}

@ObjectType()
export class ProviderSchema implements Omit<IProviderModel, 'userId' | 'servicesIds'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field()
  description!: string

  @Field(() => [ServiceListSchema])
  services!: ServiceListSchema[]

  @Field(() => UserSchema)
  user!: UserSchema
}

@InputType()
export class ProviderCreation implements Omit<IProviderModel, 'id' | 'createdAt' | 'servicesIds'> {
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

@InputType()
export class BindingProviderServices {
  @Field(() => [String])
  @AreServicesExisted({
    message: 'One of services is not existed',
  })
  servicesIds!: string[]
}

@InputType()
export class UnmountingProviderServices {
  @Field(() => [String])
  @AreServicesExisted({
    message: 'One of services is not existed',
  })
  servicesIds!: string[]
}
