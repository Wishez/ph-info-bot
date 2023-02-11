import { IsString } from 'class-validator'
import typeQl from 'type-graphql'
import { EOrderStatus, IOrderModel } from '../../models/Order/types'
import { ClientSchema } from '../Client/Client.schema'
import { IsClientExisted } from '../Client/validators'
import { FilledServiceAttributeListSchema } from '../FilledServiceAttribute/FilledServiceAttribute.schema'
import { IsFilledServiceAttributeExisted } from '../FilledServiceAttribute/validators'
import { ProviderSchema } from '../Provider/Provider.schema'
import { IsProviderExisted } from '../Provider/validators'
import { ServiceSchema } from '../Service/Service.schema'
import { IsServiceExisted } from '../Service/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class OrderListSchema implements Omit<IOrderModel, 'clientId' | 'providerId' | 'serviceId'> {
  @Field(() => ID)
  id!: string

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
}

type TOrderSchema = Omit<
  IOrderModel,
  'clientId' | 'providerId' | 'serviceId' | 'filledServicesAttributesIds'
>
@ObjectType()
export class OrderSchema implements TOrderSchema {
  @Field(() => ID)
  id!: string

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
export class OrderAttributeUpdating {
  @Field()
  @IsFilledServiceAttributeExisted()
  attributeId!: string

  @Field()
  @IsString()
  value!: string
}
