import { IsEmail, IsMobilePhone, IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IUserModel } from '../../models/User/types'
import { OrderSchema } from '../Order/Order.schema'
import { ProviderModelSchema } from '../Provider/Provider.schema'
import { IsUserNotExistedWithTelegramId } from './validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class UserSchema implements Omit<IUserModel, 'providersIds' | 'ordersIds'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  email?: string

  @Field()
  telegramId!: number

  @Field()
  name!: string

  @Field()
  createdAt!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  currentChatId?: string

  @Field(() => [ProviderModelSchema], { nullable: true })
  providers?: ProviderModelSchema[]

  @Field(() => [OrderSchema], { nullable: true })
  orders?: OrderSchema[]
}

@InputType()
export class UserCreation implements Omit<IUserModel, 'id' | 'createdAt'> {
  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  @IsMobilePhone()
  phone?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field()
  @IsUserNotExistedWithTelegramId({
    message: 'User with telegramId: $value is already existed',
  })
  telegramId!: number

  @Field()
  @IsString()
  name!: string

  @Field({ nullable: true })
  @IsString()
  username?: string
}

@InputType()
export class UserUpdating {
  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  @IsMobilePhone()
  phone?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @IsString()
  name?: string

  @Field({ nullable: true })
  @IsString()
  username?: string
}
