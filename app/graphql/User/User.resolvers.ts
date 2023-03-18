import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { IUserModel } from '../../models/User/types'
import { User } from '../../models/User/User'
import { UserCreation, UserSchema, UserUpdating } from './User.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class UserResolver {
  static user = new User()

  @Query(() => [UserSchema])
  async users(): Promise<UserSchema[]> {
    const users = await UserResolver.user.readAll()

    if (!users) return []

    return Object.values(users)
  }

  @Query(() => UserSchema || GraphQLError)
  async user(@Arg('telegramId') telegramId: number): Promise<UserSchema | GraphQLError> {
    const client = await UserResolver.user.getUserByTelegramId(telegramId)

    if (!client) {
      return new GraphQLError(`User with ${telegramId} is not found`)
    }

    return client
  }

  @Mutation(() => String || GraphQLError)
  async createUser(
    @Arg('userInfo') userInfo: UserCreation,
  ): Promise<GraphQLError | IUserModel['id']> {
    const { status, id } = await UserResolver.user.create(userInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create user")
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('userId') userId: string): Promise<boolean> {
    const status = await UserResolver.user.delete(userId)

    return status === EDbStatus.OK
  }

  @Mutation(() => UserSchema || false)
  async updateUser(
    @Arg('telegramId') telegramId: number,
    @Arg('userInfo') userInfo: UserUpdating,
  ): Promise<UserSchema | false> {
    const userModel = await UserResolver.user.getUserByTelegramId(telegramId)
    if (!userModel) return false

    const status = await UserResolver.user.update(userModel.id, userInfo)
    const nextModel = await UserResolver.user.getUserByTelegramId(telegramId)

    return (status === EDbStatus.OK && nextModel) || false
  }
}
