import { IsNumber, IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { EOrderStatus, IOrderModel } from '../../models/Order/types'
import { ClientSchema } from '../Client/Client.schema'
import { IsClientExisted } from '../Client/validators'
import { FilledServiceAttributeListSchema } from '../FilledServiceAttribute/FilledServiceAttribute.schema'
import { InformationObjectListSchema } from '../InformationObject/InformationObject.schema'
import { IsInformationObjectExisted } from '../InformationObject/validators'
import { ProviderSchema } from '../Provider/Provider.schema'
import { IsProviderExisted } from '../Provider/validators'
import { ServiceSchema } from '../Service/Service.schema'
import { IsServiceExisted } from '../Service/validators'
import { IsUserWithTelegramIdExisted } from '../User/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class OrderListSchema implements Omit<IOrderModel, 'clientId' | 'providerId' | 'serviceId'> {
  @Field(() => ID)
  id!: string

  @Field()
  number!: number

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field(() => String)
  status!: EOrderStatus

  @Field(() => ProviderSchema)
  provider!: ProviderSchema

  @Field(() => ClientSchema)
  client!: ClientSchema

  @Field(() => ServiceSchema)
  service!: ServiceSchema

  @Field(() => [String])
  filledServicesAttributesIds!: string[]

  // TODO заменить на модель Chat
  @Field()
  chatId!: string

  @Field({ nullable: true })
  informationObjectId?: string

  @Field({ nullable: true })
  netProfit?: number

  @Field({ nullable: true })
  cancelingReason?: string
}

type TOrderSchema = Omit<
  IOrderModel,
  'clientId' | 'providerId' | 'serviceId' | 'filledServicesAttributesIds' | 'informationObjectId'
>
@ObjectType()
export class OrderSchema implements TOrderSchema {
  @Field(() => ID)
  id!: string

  @Field()
  number!: number

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  createdAt!: string

  @Field(() => String)
  status!: EOrderStatus

  @Field(() => ProviderSchema)
  provider!: ProviderSchema

  @Field(() => ClientSchema)
  client!: ClientSchema

  @Field(() => ServiceSchema)
  service!: ServiceSchema

  @Field(() => [FilledServiceAttributeListSchema])
  filledServicesAttributes!: FilledServiceAttributeListSchema[]

  // TODO заменить на модель Chat
  @Field()
  chatId!: string

  @Field(() => InformationObjectListSchema, { nullable: true })
  informationObject?: InformationObjectListSchema

  @Field({ nullable: true })
  netProfit?: number

  @Field({ nullable: true })
  cancelingReason?: string
}

@InputType()
export class OrderCreation {
  @Field()
  @IsProviderExisted()
  providerId!: string

  @Field()
  @IsClientExisted()
  clientId!: string

  @Field()
  @IsServiceExisted()
  serviceId!: string
}

@InputType()
export class UpdatingOrder {
  @Field({ nullable: true })
  @IsInformationObjectExisted()
  informationObjectId?: string

  @Field({ nullable: true })
  @IsNumber()
  netProfit?: number

  @Field({ nullable: true })
  @IsString()
  cancelingReason?: string
}

@InputType()
export class OrdersByUserInput {
  @Field()
  @IsUserWithTelegramIdExisted()
  userTelegramId!: number
}
