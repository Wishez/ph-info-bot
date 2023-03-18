import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { Chat } from '../../models/Chat/Chat'
import { IChatModel } from '../../models/Chat/types'
import { ClientResolver } from '../Client/Client.resolvers'
import { ClientSchema } from '../Client/Client.schema'
import { ProviderResolver } from '../Provider/Provider.resolvers'
import { ProviderSchema } from '../Provider/Provider.schema'
import { ChatAddingMessage, ChatCreation, ChatSchema } from './Chat.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ChatResolver {
  static chat = new Chat()
  static providerResolver = new ProviderResolver()
  static clientResolver = new ClientResolver()

  @Query(() => [ChatSchema])
  async chats(): Promise<ChatSchema[]> {
    const chats = await ChatResolver.chat.readAll()
    if (!chats) return []

    return await Promise.all(
      Object.values(chats).map(async chat => {
        const provider = (await ChatResolver.providerResolver.provider(
          chat.providerId,
        )) as ProviderSchema
        const client = (await ChatResolver.clientResolver.client(
          chat.clientTelegramId,
        )) as ClientSchema

        return {
          ...chat,
          client,
          provider,
        }
      }),
    )
  }

  @Query(() => ChatSchema || GraphQLError)
  async chat(@Arg('id') id: string): Promise<ChatSchema | GraphQLError> {
    const chat = await ChatResolver.chat.read(id)

    if (!chat) {
      return new GraphQLError(`Chat with id ${id} is not found`)
    }

    const provider = await ChatResolver.providerResolver.provider(chat.providerId)
    const client = await ChatResolver.clientResolver.client(chat.clientTelegramId)

    if (provider instanceof GraphQLError || client instanceof GraphQLError) {
      return new GraphQLError(`Provider or Client is not found`)
    }

    return {
      ...chat,
      client,
      provider,
    }
  }

  @Mutation(() => String || GraphQLError)
  async createChat(
    @Arg('chatInfo') chatInfo: ChatCreation,
  ): Promise<GraphQLError | IChatModel['id']> {
    const { status, id } = await ChatResolver.chat.create(chatInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create chat")
  }

  @Mutation(() => Boolean)
  async deleteChat(@Arg('chatId') chatId: string): Promise<boolean> {
    const status = await ChatResolver.chat.delete(chatId)

    return status === EDbStatus.OK
  }

  @Mutation(() => ChatSchema || false)
  async addChatMessage(
    @Arg('chatId') chatId: string,
    @Arg('chatInfo') chatInfo: ChatAddingMessage,
  ): Promise<ChatSchema | false> {
    const addingMessageStatus = await ChatResolver.chat.addMessage(
      chatId,
      chatInfo.telegramId,
      chatInfo.message,
    )
    const chatResolver = new ChatResolver()
    const nextChat = await chatResolver.chat(chatId)

    if (addingMessageStatus !== EDbStatus.OK || nextChat instanceof GraphQLError) {
      return false
    }

    return nextChat
  }
}
