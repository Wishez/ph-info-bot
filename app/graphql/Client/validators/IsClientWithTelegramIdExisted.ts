import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Client } from '../../../models/Client/Client'
import { IUserModel } from '../../../models/User/types'

@ValidatorConstraint({ async: true })
export class IsClientWithTelegramIdExistedValidator implements ValidatorConstraintInterface {
  async validate(telegramId: IUserModel['telegramId']) {
    const client = new Client()
    const clientModel = await client.getClientByUserTelegramId(telegramId)

    return Boolean(clientModel)
  }
}

export const IsClientWithTelegramIdExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClientWithTelegramIdExistedValidator,
    })
  }
