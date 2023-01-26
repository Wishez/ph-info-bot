import { IsEmail, IsMobilePhone, IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IUserModel } from '../../models/User/types'
import { IsUserNotExistedWithTelegramId } from './validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class UserSchema implements IUserModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  email?: string

  @Field()
  telegramId!: string

  @Field()
  name!: string

  @Field()
  createdAt!: string

  @Field({ nullable: true })
  updatedAt?: string
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
  telegramId!: string

  @Field()
  @IsString()
  name!: string
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
}
