import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Service } from '../../../models/Service/Service'
import { IServiceModel } from '../../../models/Service/types'

@ValidatorConstraint({ async: true })
export class AreServicesExistedValidator implements ValidatorConstraintInterface {
  async validate(servicesIds: IServiceModel['id'][]) {
    const service = new Service()
    const entities = await service.readAll()

    if (!entities) return false

    return servicesIds.every(id => Boolean(entities[id]))
  }
}

export const AreServicesExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreServicesExistedValidator,
    })
  }
