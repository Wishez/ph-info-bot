import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Provider } from '../../../models/Provider/Provider'
import { IProviderModel } from '../../../models/Provider/types'

@ValidatorConstraint({ async: true })
export class AreProvidersExistedValidator implements ValidatorConstraintInterface {
  async validate(providerIds: IProviderModel['id'][]) {
    const provider = new Provider()
    const entities = await provider.readAll()

    if (!entities) return false

    return providerIds.every(id => Boolean(entities[id]))
  }
}

export const AreProvidersExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreProvidersExistedValidator,
    })
  }
