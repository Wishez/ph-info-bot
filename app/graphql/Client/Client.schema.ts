import { IsIn } from 'class-validator'
import typeQl from 'type-graphql'
import { IClientModel } from '../../models/Client/types'
import { EClientRank } from '../../models/Client/types/EClientRank'
import { UserSchema } from '../User/User.schema'
import { IsUserExists } from '../User/validators'

const { Field, InputType, ObjectType, ID } = typeQl

@ObjectType()
export class ClientListSchema implements IClientModel {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  rank!: EClientRank

  @Field()
  createdAt!: string

  @Field()
  userId!: string
}

@ObjectType()
export class ClientSchema implements Omit<IClientModel, 'userId'> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  rank!: EClientRank

  @Field()
  createdAt!: string

  @Field(() => UserSchema)
  user!: UserSchema
}

const ranks = Object.values(EClientRank)
const ranksValidationMessage = `Rank $value is not one of values ${ranks.join(' | ')}`
@InputType()
export class ClientCreation implements Omit<IClientModel, 'id' | 'createdAt'> {
  @Field()
  @IsIn(ranks, { message: ranksValidationMessage })
  rank!: EClientRank

  @Field()
  @IsUserExists({
    message: "User with id $value isn't existed",
  })
  userId!: string
}

@InputType()
export class ClientUpdating {
  @Field()
  @IsIn(ranks, { message: ranksValidationMessage })
  rank!: EClientRank
}
