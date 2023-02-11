import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { IChatModel } from '../../models/Chat/types'
import { EChatMessageActor } from '../../models/Chat/types/EChatMessageActor'
import { IChatMessage } from '../../models/Chat/types/IChatMessage'
import { ClientSchema } from '../Client/Client.schema'
import { IsClientWithTelegramIdExisted } from '../Client/validators'
import { ProviderSchema } from '../Provider/Provider.schema'
import { IsProviderWithTelegramIdExisted } from '../Provider/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ChatMessageSchema implements IChatMessage {
  @Field()
  message!: string

  @Field()
  id!: string
  @Field(() => String)
  sender!: EChatMessageActor

  @Field()
  createdAt!: string

  @Field({ nullable: true })
  updatedAt?: string
}

@ObjectType()
export class ChatSchema implements Omit<IChatModel, 'clientTelegramId' | 'providerTelegramId'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field(() => [ChatMessageSchema])
  messagesHistory!: ChatMessageSchema[]

  @Field(() => ClientSchema)
  client!: ClientSchema

  @Field(() => ProviderSchema)
  provider!: ProviderSchema
}

@InputType()
export class ChatCreation implements Omit<IChatModel, 'id' | 'createdAt' | 'messagesHistory'> {
  @Field()
  @IsClientWithTelegramIdExisted()
  clientTelegramId!: string

  @Field()
  @IsProviderWithTelegramIdExisted()
  providerTelegramId!: string
}

@InputType()
export class ChatAddingMessage {
  @Field()
  @IsString()
  message!: string

  @Field()
  @IsString()
  telegramId!: string
}
