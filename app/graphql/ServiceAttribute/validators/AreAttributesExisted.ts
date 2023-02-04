import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { ServiceAttribute } from '../../../models/ServiceAttribute/ServiceAttribute'
import { IServiceCategoryModel } from '../../../models/ServiceCategory/types'

@ValidatorConstraint({ async: true })
export class AttributesExistenceValidator implements ValidatorConstraintInterface {
  async validate(categoriesIds: IServiceCategoryModel['id'][]) {
    const serviceCategory = new ServiceAttribute()
    const categories = await serviceCategory.readAll()

    if (!categories) return false

    return categoriesIds.every(id => Boolean(categories[id]))
  }
}

export const AreAttributesExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AttributesExistenceValidator,
    })
  }
