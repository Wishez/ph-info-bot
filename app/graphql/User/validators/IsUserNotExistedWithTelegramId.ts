import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { IUserModel } from '../../../models/User/types'
import { User } from '../../../models/User/User'

@ValidatorConstraint({ async: true })
export class IsUserNotExistedWithTelegramIdConstraint implements ValidatorConstraintInterface {
  async validate(telegramId: IUserModel['telegramId']) {
    const user = new User()
    const userModel = await user.getUserByTelegramId(telegramId)

    return !userModel
  }
}

export const IsUserNotExistedWithTelegramId =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNotExistedWithTelegramId,
    })
  }
