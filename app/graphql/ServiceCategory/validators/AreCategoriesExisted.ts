import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'
import { ServiceCategory } from '../../../models/ServiceCategory/ServiceCategory'
import { IServiceCategoryModel } from '../../../models/ServiceCategory/types'

@ValidatorConstraint({ async: true })
export class CategoriesExistenceValidator implements ValidatorConstraintInterface {
  async validate(categoriesIds: IServiceCategoryModel['id'][]) {
    const serviceCategory = new ServiceCategory()
    const categories = await serviceCategory.readAll()

    if (!categories) return false

    return categoriesIds.every(id => Boolean(categories[id]))
  }
}

export const AreCategoriesExisted =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CategoriesExistenceValidator,
    })
  }
