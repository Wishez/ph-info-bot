import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Client } from '../../models/Client/Client'
import { IClientModel } from '../../models/Client/types'
import { ClientCreation, ClientListSchema, ClientSchema, ClientUpdating } from './Client.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ClientResolver {
  static client = new Client()

  @Query(() => [ClientListSchema])
  async clients(): Promise<ClientListSchema[]> {
    const clients = await ClientResolver.client.readAll()
    if (!clients) return []

    return Object.values(clients)
  }

  @Query(() => ClientSchema || GraphQLError)
  async client(@Arg('telegramId') telegramId: string): Promise<ClientSchema | GraphQLError> {
    const client = await ClientResolver.client.getClientByUserTelegramId(telegramId)

    if (client === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`Client with ${telegramId} is not found`)
    }

    const user = await ClientResolver.client.getUser(client.id)

    if (user === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`User with telegramId ${telegramId} is not found`)
    }

    return {
      ...client,
      user,
    }
  }

  @Query(() => ClientSchema || GraphQLError)
  async clientById(@Arg('id') id: string): Promise<ClientSchema | GraphQLError> {
    const client = await ClientResolver.client.read(id)

    if (!client) {
      return new GraphQLError(`Client with id ${id} is not found`)
    }

    const user = await ClientResolver.client.getUser(client.id)

    if (user === EDbStatus.NOT_FOUND) {
      return new GraphQLError(`User with ${id} is not found`)
    }

    return {
      ...client,
      user,
    }
  }

  @Mutation(() => String || GraphQLError)
  async createClient(
    @Arg('clientInfo') clientInfo: ClientCreation,
  ): Promise<GraphQLError | IClientModel['id']> {
    const { status, id } = await ClientResolver.client.create(clientInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create client")
  }

  @Mutation(() => Boolean)
  async deleteClient(@Arg('clientId') clientId: string): Promise<boolean> {
    const status = await ClientResolver.client.delete(clientId)

    return status === EDbStatus.OK
  }

  @Mutation(() => ClientSchema || false)
  async updateClient(
    @Arg('telegramId') telegramId: string,
    @Arg('clientInfo') clientInfo: ClientUpdating,
  ): Promise<ClientSchema | false> {
    const client = await ClientResolver.client.getClientByUserTelegramId(telegramId)
    if (client === EDbStatus.NOT_FOUND) return false

    const status = await ClientResolver.client.update(client.id, clientInfo)
    const nextClient = await ClientResolver.client.getClientByUserTelegramId(telegramId)
    const user = await ClientResolver.client.getUser(client.id)

    if (
      status !== EDbStatus.OK ||
      nextClient === EDbStatus.NOT_FOUND ||
      user === EDbStatus.NOT_FOUND
    ) {
      return false
    }

    return { ...nextClient, user }
  }
}
