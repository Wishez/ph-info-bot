import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { EDbStatus } from '../../../db/types'
import { Provider } from '../../../models/Provider/Provider'
import { IUserModel } from '../../../models/User/types'

@ValidatorConstraint({ async: true })
export class IsProviderWithTelegramIdExistedValidator implements ValidatorConstraintInterface {
  async validate(telegramId: IUserModel['telegramId']) {
    const provider = new Provider()
    const providers = await provider.getProvidersByUserTelegramId(telegramId)

    return providers !== EDbStatus.NOT_FOUND && Boolean(providers.length)
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
