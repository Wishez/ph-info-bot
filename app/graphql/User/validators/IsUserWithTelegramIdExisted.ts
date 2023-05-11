import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { IUserModel } from '../../../models/User/types'
import { User } from '../../../models/User/User'

@ValidatorConstraint({ async: true })
export class IsUserWithTelegramIdExistedConstraint implements ValidatorConstraintInterface {
  async validate(telegramId: IUserModel['telegramId']) {
    const user = new User()
    const userModel = await user.getUserByTelegramId(telegramId)

    return Boolean(userModel)
  }
}

export const IsUserWithTelegramIdExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserWithTelegramIdExisted,
    })
  }
