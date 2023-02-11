import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { Service } from '../../../models/Service/Service'
import { IServiceModel } from '../../../models/Service/types'

@ValidatorConstraint({ async: true })
export class IsServiceExistedValidator implements ValidatorConstraintInterface {
  async validate(serviceId: IServiceModel['id']) {
    const service = new Service()
    const serviceModel = await service.read(serviceId)

    return Boolean(serviceModel)
  }
}

export const IsServiceExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsServiceExistedValidator,
    })
  }
