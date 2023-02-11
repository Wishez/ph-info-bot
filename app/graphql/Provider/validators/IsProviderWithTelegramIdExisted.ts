import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Provider } from '../../../models/Provider/Provider'
import { IUserModel } from '../../../models/User/types'

@ValidatorConstraint({ async: true })
export class IsProviderWithTelegramIdExistedValidator implements ValidatorConstraintInterface {
  async validate(telegramId: IUserModel['id']) {
    const provider = new Provider()
    const providerModel = await provider.getProviderByUserTelegramId(telegramId)

    return Boolean(providerModel)
  }
}

export const IsProviderWithTelegramIdExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProviderWithTelegramIdExistedValidator,
    })
  }
