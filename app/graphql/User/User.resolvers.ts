import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { IUserModel } from '../../models/User/types'
import { User } from '../../models/User/User'
import { OrderResolver } from '../Order/Order.resolvers'
import { OrderSchema } from '../Order/Order.schema'
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
    const user = await UserResolver.user.getUserByTelegramId(telegramId)

    if (!user) {
      return new GraphQLError(`User with ${telegramId} is not found`)
    }

    const orderResolver = new OrderResolver()

    try {
      const orders = await Promise.all(
        (user.ordersIds || []).map(orderId => orderResolver.order(orderId)),
      )
      const providers = await UserResolver.user.getUserProviders(user.id)

      return {
        ...user,
        providers: providers === EDbStatus.NOT_FOUND ? [] : Object.values(providers),
        orders: orders.reduce((result: OrderSchema[], order) => {
          if (!(order instanceof GraphQLError)) {
            result.push(order)
          }

          return result
        }, []),
      }
    } catch {}

    return user
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

  @Mutation(() => Boolean)
  async connectUserToChat(
    @Arg('userId') userId: string,
    @Arg('chatId') chatId: string,
  ): Promise<boolean> {
    const status = await UserResolver.user.connectToChat(userId, chatId)

    return status === EDbStatus.OK
  }

  @Mutation(() => Boolean)
  async disconnectUserFromChat(@Arg('userId') userId: string): Promise<boolean> {
    const status = await UserResolver.user.leaveChat(userId)

    return status === EDbStatus.OK
  }
}
