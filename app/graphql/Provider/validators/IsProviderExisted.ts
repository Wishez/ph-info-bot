import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Provider } from '../../../models/Provider/Provider'
import { IProviderModel } from '../../../models/Provider/types'

@ValidatorConstraint({ async: true })
export class IsProviderExistedValidator implements ValidatorConstraintInterface {
  async validate(id: IProviderModel['id']) {
    const provider = new Provider()
    const providerModel = await provider.read(id)

    return Boolean(providerModel)
  }
}

export const IsProviderExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProviderExistedValidator,
    })
  }
