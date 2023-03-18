import { GraphQLError } from 'graphql'
import typeQl from 'type-graphql'
import { EDbStatus } from '../../db/types'
import { ServiceCategory } from '../../models/ServiceCategory/ServiceCategory'
import { IServiceCategoryModel } from '../../models/ServiceCategory/types'
import { ServiceResolver } from '../Service/Service.resolvers'
import {
  ServiceCategoryBindingSubcategories,
  ServiceCategoryCreation,
  ServiceCategoryListSchema,
  ServiceCategorySchema,
  ServiceCategoryUnmountingSubcategories,
  ServiceCategoryUpdating,
} from './ServiceCategory.schema'

const { Query, Resolver, Arg, Mutation } = typeQl

@Resolver()
export class ServiceCategoryResolver {
  static serviceCategory = new ServiceCategory()

  @Query(() => [ServiceCategoryListSchema])
  async serviceCategories(): Promise<ServiceCategoryListSchema[]> {
    const serviceCategories = await ServiceCategoryResolver.serviceCategory.readAll()
    if (!serviceCategories) return []

    return Object.values(serviceCategories)
  }

  @Query(() => ServiceCategorySchema || GraphQLError)
  async serviceCategory(@Arg('id') id: string): Promise<ServiceCategorySchema | GraphQLError> {
    const serviceCategory = await ServiceCategoryResolver.serviceCategory.read(id)

    if (!serviceCategory) {
      return new GraphQLError(`Service Category with ${id} is not found`)
    }

    const { subcategoriesIds, servicesIds } = serviceCategory
    const serviceCategories = await ServiceCategoryResolver.serviceCategory.readAll()
    const services = await ServiceResolver.service.readAll()

    return {
      ...serviceCategory,
      subcategories: serviceCategories
        ? subcategoriesIds?.map(categoryId => serviceCategories[categoryId]!) || []
        : [],
      services: services ? servicesIds.map(serviceId => services[serviceId]!) : [],
    }
  }

  @Mutation(() => String || GraphQLError)
  async createServiceCategory(
    @Arg('serviceCategoryInfo') serviceCategoryInfo: ServiceCategoryCreation,
  ): Promise<GraphQLError | IServiceCategoryModel['id']> {
    const { status, id } = await ServiceCategoryResolver.serviceCategory.create(serviceCategoryInfo)

    if (status === EDbStatus.OK) return id

    return new GraphQLError("Can't create service category")
  }

  @Mutation(() => Boolean)
  async deleteServiceCategory(@Arg('id') id: string): Promise<boolean> {
    const status = await ServiceCategoryResolver.serviceCategory.delete(id)

    return status === EDbStatus.OK
  }

  @Mutation(() => ServiceCategorySchema || false)
  async updateServiceCategory(
    @Arg('id') id: string,
    @Arg('serviceCategoryInfo') serviceCategoryInfo: ServiceCategoryUpdating,
  ): Promise<ServiceCategorySchema | false> {
    const status = await ServiceCategoryResolver.serviceCategory.update(id, serviceCategoryInfo)
    const nextServiceCategory = await this.serviceCategory(id)

    if (status !== EDbStatus.OK || nextServiceCategory instanceof GraphQLError) {
      return false
    }

    return nextServiceCategory
  }

  @Mutation(() => ServiceCategorySchema || false)
  async bindSubcategoriesToCategory(
    @Arg('id') id: string,
    @Arg('serviceCategoryInfo') serviceCategoryInfo: ServiceCategoryBindingSubcategories,
  ): Promise<ServiceCategorySchema | false> {
    const serviceCategory = await ServiceCategoryResolver.serviceCategory.read(id)
    if (!serviceCategory) return false

    const status = await ServiceCategoryResolver.serviceCategory.bindSubCategories(
      id,
      serviceCategoryInfo.subcategoriesIds,
    )
    const nextServiceCategory = await this.serviceCategory(id)

    if (status !== EDbStatus.OK || nextServiceCategory instanceof GraphQLError) {
      return false
    }

    return nextServiceCategory
  }

  @Mutation(() => ServiceCategorySchema || false)
  async unmountSubcategoriesFromCategory(
    @Arg('id') id: string,
    @Arg('serviceCategoryInfo') serviceCategoryInfo: ServiceCategoryUnmountingSubcategories,
  ): Promise<ServiceCategorySchema | false> {
    const serviceCategory = await ServiceCategoryResolver.serviceCategory.read(id)
    if (!serviceCategory) return false

    const status = await ServiceCategoryResolver.serviceCategory.unmountSubCategories(
      id,
      serviceCategoryInfo.subcategoriesIds,
    )
    const nextServiceCategory = await this.serviceCategory(id)

    if (status !== EDbStatus.OK || nextServiceCategory instanceof GraphQLError) {
      return false
    }

    return nextServiceCategory
  }
}
