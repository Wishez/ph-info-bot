import type {
  AcceptableVariables,
  DirectiveArgs,
  FieldOptions,
  ObjectFetcher,
  UnresolvedVariables,
} from 'graphql-ts-client-api'
import { createFetchableType, createFetcher } from 'graphql-ts-client-api'
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata'
import type {
  ChatAddingMessage,
  ChatCreation,
  ClientCreation,
  ClientUpdating,
  FilledServiceAttributeCreation,
  FilledServiceAttributeUpdating,
  OrderAttributeUpdating,
  OrderCreation,
  ProviderCreation,
  ProviderUpdating,
  ServiceAttributeCreation,
  ServiceAttributeUpdating,
  ServiceBindingAttributes,
  ServiceBindingCategory,
  ServiceCategoryBindingSubcategories,
  ServiceCategoryCreation,
  ServiceCategoryUnmountingSubcategories,
  ServiceCategoryUpdating,
  ServiceCreation,
  ServiceDeletingAttribute,
  ServiceUpdating,
  UserCreation,
  UserUpdating,
} from '../inputs'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface MutationFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Mutation', T, TVariables> {
  directive(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>

  createClient(): MutationFetcher<
    T & { readonly createClient: string },
    TVariables & MutationArgs['createClient']
  >

  createClient<XArgs extends AcceptableVariables<MutationArgs['createClient']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createClient: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createClient']>
  >

  createClient<
    XAlias extends string = 'createClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createClient'] & XDirectiveVariables
  >

  createClient<
    XArgs extends AcceptableVariables<MutationArgs['createClient']>,
    XAlias extends string = 'createClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createClient']> & XDirectiveVariables
  >

  deleteClient(): MutationFetcher<
    T & { readonly deleteClient: boolean },
    TVariables & MutationArgs['deleteClient']
  >

  deleteClient<XArgs extends AcceptableVariables<MutationArgs['deleteClient']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteClient: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteClient']>
  >

  deleteClient<
    XAlias extends string = 'deleteClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteClient'] & XDirectiveVariables
  >

  deleteClient<
    XArgs extends AcceptableVariables<MutationArgs['deleteClient']>,
    XAlias extends string = 'deleteClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteClient']> & XDirectiveVariables
  >

  updateClient<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateClient: X },
    TVariables & XVariables & MutationArgs['updateClient']
  >

  updateClient<
    XArgs extends AcceptableVariables<MutationArgs['updateClient']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateClient: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateClient']>
  >

  updateClient<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateClient'] & XDirectiveVariables
  >

  updateClient<
    XArgs extends AcceptableVariables<MutationArgs['updateClient']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateClient',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateClient', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateClient']> &
      XDirectiveVariables
  >

  createServiceCategory(): MutationFetcher<
    T & { readonly createServiceCategory: string },
    TVariables & MutationArgs['createServiceCategory']
  >

  createServiceCategory<XArgs extends AcceptableVariables<MutationArgs['createServiceCategory']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createServiceCategory: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createServiceCategory']>
  >

  createServiceCategory<
    XAlias extends string = 'createServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createServiceCategory'] & XDirectiveVariables
  >

  createServiceCategory<
    XArgs extends AcceptableVariables<MutationArgs['createServiceCategory']>,
    XAlias extends string = 'createServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['createServiceCategory']> &
      XDirectiveVariables
  >

  deleteServiceCategory(): MutationFetcher<
    T & { readonly deleteServiceCategory: boolean },
    TVariables & MutationArgs['deleteServiceCategory']
  >

  deleteServiceCategory<XArgs extends AcceptableVariables<MutationArgs['deleteServiceCategory']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteServiceCategory: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteServiceCategory']>
  >

  deleteServiceCategory<
    XAlias extends string = 'deleteServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteServiceCategory'] & XDirectiveVariables
  >

  deleteServiceCategory<
    XArgs extends AcceptableVariables<MutationArgs['deleteServiceCategory']>,
    XAlias extends string = 'deleteServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['deleteServiceCategory']> &
      XDirectiveVariables
  >

  updateServiceCategory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateServiceCategory: X },
    TVariables & XVariables & MutationArgs['updateServiceCategory']
  >

  updateServiceCategory<
    XArgs extends AcceptableVariables<MutationArgs['updateServiceCategory']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateServiceCategory: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateServiceCategory']>
  >

  updateServiceCategory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateServiceCategory'] & XDirectiveVariables
  >

  updateServiceCategory<
    XArgs extends AcceptableVariables<MutationArgs['updateServiceCategory']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateServiceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateServiceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateServiceCategory']> &
      XDirectiveVariables
  >

  bindSubcategoriesToCategory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindSubcategoriesToCategory: X },
    TVariables & XVariables & MutationArgs['bindSubcategoriesToCategory']
  >

  bindSubcategoriesToCategory<
    XArgs extends AcceptableVariables<MutationArgs['bindSubcategoriesToCategory']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindSubcategoriesToCategory: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['bindSubcategoriesToCategory']>
  >

  bindSubcategoriesToCategory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindSubcategoriesToCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindSubcategoriesToCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['bindSubcategoriesToCategory'] & XDirectiveVariables
  >

  bindSubcategoriesToCategory<
    XArgs extends AcceptableVariables<MutationArgs['bindSubcategoriesToCategory']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindSubcategoriesToCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindSubcategoriesToCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['bindSubcategoriesToCategory']> &
      XDirectiveVariables
  >

  unmountSubcategoriesFromCategory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly unmountSubcategoriesFromCategory: X },
    TVariables & XVariables & MutationArgs['unmountSubcategoriesFromCategory']
  >

  unmountSubcategoriesFromCategory<
    XArgs extends AcceptableVariables<MutationArgs['unmountSubcategoriesFromCategory']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly unmountSubcategoriesFromCategory: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['unmountSubcategoriesFromCategory']>
  >

  unmountSubcategoriesFromCategory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'unmountSubcategoriesFromCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'unmountSubcategoriesFromCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['unmountSubcategoriesFromCategory'] & XDirectiveVariables
  >

  unmountSubcategoriesFromCategory<
    XArgs extends AcceptableVariables<MutationArgs['unmountSubcategoriesFromCategory']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'unmountSubcategoriesFromCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'unmountSubcategoriesFromCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['unmountSubcategoriesFromCategory']> &
      XDirectiveVariables
  >

  createService(): MutationFetcher<
    T & { readonly createService: string },
    TVariables & MutationArgs['createService']
  >

  createService<XArgs extends AcceptableVariables<MutationArgs['createService']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createService: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createService']>
  >

  createService<
    XAlias extends string = 'createService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createService'] & XDirectiveVariables
  >

  createService<
    XArgs extends AcceptableVariables<MutationArgs['createService']>,
    XAlias extends string = 'createService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createService']> & XDirectiveVariables
  >

  deleteService(): MutationFetcher<
    T & { readonly deleteService: boolean },
    TVariables & MutationArgs['deleteService']
  >

  deleteService<XArgs extends AcceptableVariables<MutationArgs['deleteService']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteService: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteService']>
  >

  deleteService<
    XAlias extends string = 'deleteService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteService'] & XDirectiveVariables
  >

  deleteService<
    XArgs extends AcceptableVariables<MutationArgs['deleteService']>,
    XAlias extends string = 'deleteService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteService']> & XDirectiveVariables
  >

  updateService<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateService: X },
    TVariables & XVariables & MutationArgs['updateService']
  >

  updateService<
    XArgs extends AcceptableVariables<MutationArgs['updateService']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateService: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateService']>
  >

  updateService<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateService'] & XDirectiveVariables
  >

  updateService<
    XArgs extends AcceptableVariables<MutationArgs['updateService']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateService']> &
      XDirectiveVariables
  >

  bindCategoryToService<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindCategoryToService: X },
    TVariables & XVariables & MutationArgs['bindCategoryToService']
  >

  bindCategoryToService<
    XArgs extends AcceptableVariables<MutationArgs['bindCategoryToService']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindCategoryToService: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['bindCategoryToService']>
  >

  bindCategoryToService<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindCategoryToService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindCategoryToService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['bindCategoryToService'] & XDirectiveVariables
  >

  bindCategoryToService<
    XArgs extends AcceptableVariables<MutationArgs['bindCategoryToService']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindCategoryToService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindCategoryToService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['bindCategoryToService']> &
      XDirectiveVariables
  >

  bindAttributesToService<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindAttributesToService: X },
    TVariables & XVariables & MutationArgs['bindAttributesToService']
  >

  bindAttributesToService<
    XArgs extends AcceptableVariables<MutationArgs['bindAttributesToService']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly bindAttributesToService: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['bindAttributesToService']>
  >

  bindAttributesToService<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindAttributesToService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindAttributesToService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['bindAttributesToService'] & XDirectiveVariables
  >

  bindAttributesToService<
    XArgs extends AcceptableVariables<MutationArgs['bindAttributesToService']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'bindAttributesToService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'bindAttributesToService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['bindAttributesToService']> &
      XDirectiveVariables
  >

  deleteAttributesFromService<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly deleteAttributesFromService: X },
    TVariables & XVariables & MutationArgs['deleteAttributesFromService']
  >

  deleteAttributesFromService<
    XArgs extends AcceptableVariables<MutationArgs['deleteAttributesFromService']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly deleteAttributesFromService: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['deleteAttributesFromService']>
  >

  deleteAttributesFromService<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'deleteAttributesFromService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'deleteAttributesFromService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['deleteAttributesFromService'] & XDirectiveVariables
  >

  deleteAttributesFromService<
    XArgs extends AcceptableVariables<MutationArgs['deleteAttributesFromService']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'deleteAttributesFromService',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'deleteAttributesFromService', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['deleteAttributesFromService']> &
      XDirectiveVariables
  >

  createProvider(): MutationFetcher<
    T & { readonly createProvider: string },
    TVariables & MutationArgs['createProvider']
  >

  createProvider<XArgs extends AcceptableVariables<MutationArgs['createProvider']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createProvider: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createProvider']>
  >

  createProvider<
    XAlias extends string = 'createProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createProvider'] & XDirectiveVariables
  >

  createProvider<
    XArgs extends AcceptableVariables<MutationArgs['createProvider']>,
    XAlias extends string = 'createProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createProvider']> & XDirectiveVariables
  >

  deleteProvider(): MutationFetcher<
    T & { readonly deleteProvider: boolean },
    TVariables & MutationArgs['deleteProvider']
  >

  deleteProvider<XArgs extends AcceptableVariables<MutationArgs['deleteProvider']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteProvider: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteProvider']>
  >

  deleteProvider<
    XAlias extends string = 'deleteProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteProvider'] & XDirectiveVariables
  >

  deleteProvider<
    XArgs extends AcceptableVariables<MutationArgs['deleteProvider']>,
    XAlias extends string = 'deleteProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteProvider']> & XDirectiveVariables
  >

  updateProvider<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateProvider: X },
    TVariables & XVariables & MutationArgs['updateProvider']
  >

  updateProvider<
    XArgs extends AcceptableVariables<MutationArgs['updateProvider']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateProvider: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateProvider']>
  >

  updateProvider<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateProvider'] & XDirectiveVariables
  >

  updateProvider<
    XArgs extends AcceptableVariables<MutationArgs['updateProvider']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateProvider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateProvider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateProvider']> &
      XDirectiveVariables
  >

  createChat(): MutationFetcher<
    T & { readonly createChat: string },
    TVariables & MutationArgs['createChat']
  >

  createChat<XArgs extends AcceptableVariables<MutationArgs['createChat']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createChat: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createChat']>
  >

  createChat<
    XAlias extends string = 'createChat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createChat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createChat'] & XDirectiveVariables
  >

  createChat<
    XArgs extends AcceptableVariables<MutationArgs['createChat']>,
    XAlias extends string = 'createChat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createChat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createChat']> & XDirectiveVariables
  >

  deleteChat(): MutationFetcher<
    T & { readonly deleteChat: boolean },
    TVariables & MutationArgs['deleteChat']
  >

  deleteChat<XArgs extends AcceptableVariables<MutationArgs['deleteChat']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteChat: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteChat']>
  >

  deleteChat<
    XAlias extends string = 'deleteChat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteChat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteChat'] & XDirectiveVariables
  >

  deleteChat<
    XArgs extends AcceptableVariables<MutationArgs['deleteChat']>,
    XAlias extends string = 'deleteChat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteChat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteChat']> & XDirectiveVariables
  >

  addChatMessage<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly addChatMessage: X },
    TVariables & XVariables & MutationArgs['addChatMessage']
  >

  addChatMessage<
    XArgs extends AcceptableVariables<MutationArgs['addChatMessage']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly addChatMessage: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['addChatMessage']>
  >

  addChatMessage<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'addChatMessage',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'addChatMessage', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['addChatMessage'] & XDirectiveVariables
  >

  addChatMessage<
    XArgs extends AcceptableVariables<MutationArgs['addChatMessage']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'addChatMessage',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'addChatMessage', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['addChatMessage']> &
      XDirectiveVariables
  >

  createFilledServiceAttribute(): MutationFetcher<
    T & { readonly createFilledServiceAttribute: string },
    TVariables & MutationArgs['createFilledServiceAttribute']
  >

  createFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['createFilledServiceAttribute']>,
  >(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createFilledServiceAttribute: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createFilledServiceAttribute']>
  >

  createFilledServiceAttribute<
    XAlias extends string = 'createFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createFilledServiceAttribute'] & XDirectiveVariables
  >

  createFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['createFilledServiceAttribute']>,
    XAlias extends string = 'createFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['createFilledServiceAttribute']> &
      XDirectiveVariables
  >

  deleteFilledServiceAttribute(): MutationFetcher<
    T & { readonly deleteFilledServiceAttribute: boolean },
    TVariables & MutationArgs['deleteFilledServiceAttribute']
  >

  deleteFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['deleteFilledServiceAttribute']>,
  >(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteFilledServiceAttribute: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteFilledServiceAttribute']>
  >

  deleteFilledServiceAttribute<
    XAlias extends string = 'deleteFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteFilledServiceAttribute'] & XDirectiveVariables
  >

  deleteFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['deleteFilledServiceAttribute']>,
    XAlias extends string = 'deleteFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['deleteFilledServiceAttribute']> &
      XDirectiveVariables
  >

  updateFilledServiceAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateFilledServiceAttribute: X },
    TVariables & XVariables & MutationArgs['updateFilledServiceAttribute']
  >

  updateFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateFilledServiceAttribute']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateFilledServiceAttribute: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateFilledServiceAttribute']>
  >

  updateFilledServiceAttribute<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateFilledServiceAttribute'] & XDirectiveVariables
  >

  updateFilledServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateFilledServiceAttribute']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateFilledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateFilledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateFilledServiceAttribute']> &
      XDirectiveVariables
  >

  createOrder(): MutationFetcher<
    T & { readonly createOrder: string },
    TVariables & MutationArgs['createOrder']
  >

  createOrder<XArgs extends AcceptableVariables<MutationArgs['createOrder']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createOrder: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createOrder']>
  >

  createOrder<
    XAlias extends string = 'createOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createOrder'] & XDirectiveVariables
  >

  createOrder<
    XArgs extends AcceptableVariables<MutationArgs['createOrder']>,
    XAlias extends string = 'createOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createOrder']> & XDirectiveVariables
  >

  deleteOrder(): MutationFetcher<
    T & { readonly deleteOrder: boolean },
    TVariables & MutationArgs['deleteOrder']
  >

  deleteOrder<XArgs extends AcceptableVariables<MutationArgs['deleteOrder']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteOrder: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteOrder']>
  >

  deleteOrder<
    XAlias extends string = 'deleteOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteOrder'] & XDirectiveVariables
  >

  deleteOrder<
    XArgs extends AcceptableVariables<MutationArgs['deleteOrder']>,
    XAlias extends string = 'deleteOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteOrder']> & XDirectiveVariables
  >

  updateOrderAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateOrderAttribute: X },
    TVariables & XVariables & MutationArgs['updateOrderAttribute']
  >

  updateOrderAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateOrderAttribute']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateOrderAttribute: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateOrderAttribute']>
  >

  updateOrderAttribute<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateOrderAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateOrderAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateOrderAttribute'] & XDirectiveVariables
  >

  updateOrderAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateOrderAttribute']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateOrderAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateOrderAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateOrderAttribute']> &
      XDirectiveVariables
  >

  cancelOrder<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly cancelOrder: X },
    TVariables & XVariables & MutationArgs['cancelOrder']
  >

  cancelOrder<
    XArgs extends AcceptableVariables<MutationArgs['cancelOrder']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly cancelOrder: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['cancelOrder']>
  >

  cancelOrder<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'cancelOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'cancelOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['cancelOrder'] & XDirectiveVariables
  >

  cancelOrder<
    XArgs extends AcceptableVariables<MutationArgs['cancelOrder']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'cancelOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'cancelOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['cancelOrder']> &
      XDirectiveVariables
  >

  completeOrder<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly completeOrder: X },
    TVariables & XVariables & MutationArgs['completeOrder']
  >

  completeOrder<
    XArgs extends AcceptableVariables<MutationArgs['completeOrder']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly completeOrder: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['completeOrder']>
  >

  completeOrder<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'completeOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'completeOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['completeOrder'] & XDirectiveVariables
  >

  completeOrder<
    XArgs extends AcceptableVariables<MutationArgs['completeOrder']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'completeOrder',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'completeOrder', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['completeOrder']> &
      XDirectiveVariables
  >

  createServiceAttribute(): MutationFetcher<
    T & { readonly createServiceAttribute: string },
    TVariables & MutationArgs['createServiceAttribute']
  >

  createServiceAttribute<XArgs extends AcceptableVariables<MutationArgs['createServiceAttribute']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createServiceAttribute: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createServiceAttribute']>
  >

  createServiceAttribute<
    XAlias extends string = 'createServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createServiceAttribute'] & XDirectiveVariables
  >

  createServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['createServiceAttribute']>,
    XAlias extends string = 'createServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['createServiceAttribute']> &
      XDirectiveVariables
  >

  deleteServiceAttribute(): MutationFetcher<
    T & { readonly deleteServiceAttribute: boolean },
    TVariables & MutationArgs['deleteServiceAttribute']
  >

  deleteServiceAttribute<XArgs extends AcceptableVariables<MutationArgs['deleteServiceAttribute']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteServiceAttribute: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteServiceAttribute']>
  >

  deleteServiceAttribute<
    XAlias extends string = 'deleteServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteServiceAttribute'] & XDirectiveVariables
  >

  deleteServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['deleteServiceAttribute']>,
    XAlias extends string = 'deleteServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs['deleteServiceAttribute']> &
      XDirectiveVariables
  >

  updateServiceAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateServiceAttribute: X },
    TVariables & XVariables & MutationArgs['updateServiceAttribute']
  >

  updateServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateServiceAttribute']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateServiceAttribute: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateServiceAttribute']>
  >

  updateServiceAttribute<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateServiceAttribute'] & XDirectiveVariables
  >

  updateServiceAttribute<
    XArgs extends AcceptableVariables<MutationArgs['updateServiceAttribute']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateServiceAttribute']> &
      XDirectiveVariables
  >

  createUser(): MutationFetcher<
    T & { readonly createUser: string },
    TVariables & MutationArgs['createUser']
  >

  createUser<XArgs extends AcceptableVariables<MutationArgs['createUser']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly createUser: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createUser']>
  >

  createUser<
    XAlias extends string = 'createUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs['createUser'] & XDirectiveVariables
  >

  createUser<
    XArgs extends AcceptableVariables<MutationArgs['createUser']>,
    XAlias extends string = 'createUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'createUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['createUser']> & XDirectiveVariables
  >

  deleteUser(): MutationFetcher<
    T & { readonly deleteUser: boolean },
    TVariables & MutationArgs['deleteUser']
  >

  deleteUser<XArgs extends AcceptableVariables<MutationArgs['deleteUser']>>(
    args: XArgs,
  ): MutationFetcher<
    T & { readonly deleteUser: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteUser']>
  >

  deleteUser<
    XAlias extends string = 'deleteUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'deleteUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs['deleteUser'] & XDirectiveVariables
  >

  deleteUser<
    XArgs extends AcceptableVariables<MutationArgs['deleteUser']>,
    XAlias extends string = 'deleteUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'deleteUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteUser']> & XDirectiveVariables
  >

  updateUser<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateUser: X },
    TVariables & XVariables & MutationArgs['updateUser']
  >

  updateUser<
    XArgs extends AcceptableVariables<MutationArgs['updateUser']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): MutationFetcher<
    T & { readonly updateUser: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['updateUser']>
  >

  updateUser<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs['updateUser'] & XDirectiveVariables
  >

  updateUser<
    XArgs extends AcceptableVariables<MutationArgs['updateUser']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'updateUser',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'UserSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'updateUser', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs['updateUser']> &
      XDirectiveVariables
  >
}

export const mutation$: MutationFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Mutation',
    'EMBEDDED',
    [],
    [
      {
        category: 'SCALAR',
        name: 'createClient',
        argGraphQLTypeMap: { clientInfo: 'ClientCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteClient',
        argGraphQLTypeMap: { clientId: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateClient',
        argGraphQLTypeMap: {
          clientInfo: 'ClientUpdating!',
          telegramId: 'Float!',
        },
        targetTypeName: 'ClientSchema',
      },
      {
        category: 'SCALAR',
        name: 'createServiceCategory',
        argGraphQLTypeMap: { serviceCategoryInfo: 'ServiceCategoryCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteServiceCategory',
        argGraphQLTypeMap: { id: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateServiceCategory',
        argGraphQLTypeMap: {
          serviceCategoryInfo: 'ServiceCategoryUpdating!',
          id: 'String!',
        },
        targetTypeName: 'ServiceCategorySchema',
      },
      {
        category: 'REFERENCE',
        name: 'bindSubcategoriesToCategory',
        argGraphQLTypeMap: {
          serviceCategoryInfo: 'ServiceCategoryBindingSubcategories!',
          id: 'String!',
        },
        targetTypeName: 'ServiceCategorySchema',
      },
      {
        category: 'REFERENCE',
        name: 'unmountSubcategoriesFromCategory',
        argGraphQLTypeMap: {
          serviceCategoryInfo: 'ServiceCategoryUnmountingSubcategories!',
          id: 'String!',
        },
        targetTypeName: 'ServiceCategorySchema',
      },
      {
        category: 'SCALAR',
        name: 'createService',
        argGraphQLTypeMap: { serviceInfo: 'ServiceCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteService',
        argGraphQLTypeMap: { id: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateService',
        argGraphQLTypeMap: {
          serviceInfo: 'ServiceUpdating!',
          id: 'String!',
        },
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'REFERENCE',
        name: 'bindCategoryToService',
        argGraphQLTypeMap: {
          serviceInfo: 'ServiceBindingCategory!',
          id: 'String!',
        },
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'REFERENCE',
        name: 'bindAttributesToService',
        argGraphQLTypeMap: {
          serviceInfo: 'ServiceBindingAttributes!',
          id: 'String!',
        },
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'REFERENCE',
        name: 'deleteAttributesFromService',
        argGraphQLTypeMap: {
          serviceInfo: 'ServiceDeletingAttribute!',
          id: 'String!',
        },
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'SCALAR',
        name: 'createProvider',
        argGraphQLTypeMap: { providerInfo: 'ProviderCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteProvider',
        argGraphQLTypeMap: { providerId: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateProvider',
        argGraphQLTypeMap: {
          providerInfo: 'ProviderUpdating!',
          id: 'String!',
        },
        targetTypeName: 'ProviderSchema',
      },
      {
        category: 'SCALAR',
        name: 'createChat',
        argGraphQLTypeMap: { chatInfo: 'ChatCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteChat',
        argGraphQLTypeMap: { chatId: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'addChatMessage',
        argGraphQLTypeMap: {
          chatInfo: 'ChatAddingMessage!',
          chatId: 'String!',
        },
        targetTypeName: 'ChatSchema',
      },
      {
        category: 'SCALAR',
        name: 'createFilledServiceAttribute',
        argGraphQLTypeMap: { filledServiceAttributeInfo: 'FilledServiceAttributeCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteFilledServiceAttribute',
        argGraphQLTypeMap: { filledServiceAttributeId: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateFilledServiceAttribute',
        argGraphQLTypeMap: {
          filledServiceAttributeInfo: 'FilledServiceAttributeUpdating!',
          filledServiceAttributeId: 'String!',
        },
        targetTypeName: 'FilledServiceAttributeSchema',
      },
      {
        category: 'SCALAR',
        name: 'createOrder',
        argGraphQLTypeMap: { orderInfo: 'OrderCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteOrder',
        argGraphQLTypeMap: { id: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateOrderAttribute',
        argGraphQLTypeMap: {
          orderInfo: 'OrderAttributeUpdating!',
          id: 'String!',
        },
        targetTypeName: 'OrderSchema',
      },
      {
        category: 'REFERENCE',
        name: 'cancelOrder',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'OrderSchema',
      },
      {
        category: 'REFERENCE',
        name: 'completeOrder',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'OrderSchema',
      },
      {
        category: 'SCALAR',
        name: 'createServiceAttribute',
        argGraphQLTypeMap: { serviceAttributeInfo: 'ServiceAttributeCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteServiceAttribute',
        argGraphQLTypeMap: { id: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateServiceAttribute',
        argGraphQLTypeMap: {
          serviceAttributeInfo: 'ServiceAttributeUpdating!',
          id: 'String!',
        },
        targetTypeName: 'ServiceAttributeSchema',
      },
      {
        category: 'SCALAR',
        name: 'createUser',
        argGraphQLTypeMap: { userInfo: 'UserCreation!' },
      },
      {
        category: 'SCALAR',
        name: 'deleteUser',
        argGraphQLTypeMap: { userId: 'String!' },
      },
      {
        category: 'REFERENCE',
        name: 'updateUser',
        argGraphQLTypeMap: {
          userInfo: 'UserUpdating!',
          telegramId: 'Float!',
        },
        targetTypeName: 'UserSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export interface MutationArgs {
  readonly createClient: {
    readonly clientInfo: ClientCreation
  }

  readonly deleteClient: {
    readonly clientId: string
  }

  readonly updateClient: {
    readonly clientInfo: ClientUpdating
    readonly telegramId: number
  }

  readonly createServiceCategory: {
    readonly serviceCategoryInfo: ServiceCategoryCreation
  }

  readonly deleteServiceCategory: {
    readonly id: string
  }

  readonly updateServiceCategory: {
    readonly serviceCategoryInfo: ServiceCategoryUpdating
    readonly id: string
  }

  readonly bindSubcategoriesToCategory: {
    readonly serviceCategoryInfo: ServiceCategoryBindingSubcategories
    readonly id: string
  }

  readonly unmountSubcategoriesFromCategory: {
    readonly serviceCategoryInfo: ServiceCategoryUnmountingSubcategories
    readonly id: string
  }

  readonly createService: {
    readonly serviceInfo: ServiceCreation
  }

  readonly deleteService: {
    readonly id: string
  }

  readonly updateService: {
    readonly serviceInfo: ServiceUpdating
    readonly id: string
  }

  readonly bindCategoryToService: {
    readonly serviceInfo: ServiceBindingCategory
    readonly id: string
  }

  readonly bindAttributesToService: {
    readonly serviceInfo: ServiceBindingAttributes
    readonly id: string
  }

  readonly deleteAttributesFromService: {
    readonly serviceInfo: ServiceDeletingAttribute
    readonly id: string
  }

  readonly createProvider: {
    readonly providerInfo: ProviderCreation
  }

  readonly deleteProvider: {
    readonly providerId: string
  }

  readonly updateProvider: {
    readonly providerInfo: ProviderUpdating
    readonly id: string
  }

  readonly createChat: {
    readonly chatInfo: ChatCreation
  }

  readonly deleteChat: {
    readonly chatId: string
  }

  readonly addChatMessage: {
    readonly chatInfo: ChatAddingMessage
    readonly chatId: string
  }

  readonly createFilledServiceAttribute: {
    readonly filledServiceAttributeInfo: FilledServiceAttributeCreation
  }

  readonly deleteFilledServiceAttribute: {
    readonly filledServiceAttributeId: string
  }

  readonly updateFilledServiceAttribute: {
    readonly filledServiceAttributeInfo: FilledServiceAttributeUpdating
    readonly filledServiceAttributeId: string
  }

  readonly createOrder: {
    readonly orderInfo: OrderCreation
  }

  readonly deleteOrder: {
    readonly id: string
  }

  readonly updateOrderAttribute: {
    readonly orderInfo: OrderAttributeUpdating
    readonly id: string
  }

  readonly cancelOrder: {
    readonly id: string
  }

  readonly completeOrder: {
    readonly id: string
  }

  readonly createServiceAttribute: {
    readonly serviceAttributeInfo: ServiceAttributeCreation
  }

  readonly deleteServiceAttribute: {
    readonly id: string
  }

  readonly updateServiceAttribute: {
    readonly serviceAttributeInfo: ServiceAttributeUpdating
    readonly id: string
  }

  readonly createUser: {
    readonly userInfo: UserCreation
  }

  readonly deleteUser: {
    readonly userId: string
  }

  readonly updateUser: {
    readonly userInfo: UserUpdating
    readonly telegramId: number
  }
}
