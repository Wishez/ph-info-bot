import type { DirectiveArgs, FieldOptions, ObjectFetcher } from 'graphql-ts-client-api'
import { createFetchableType, createFetcher } from 'graphql-ts-client-api'
import type { ImplementationType, WithTypeName } from '../CommonTypes'
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface ServiceCategoryListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceCategoryListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceCategoryListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceCategoryListSchemaFetcher<
    XName extends 'ServiceCategoryListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceCategoryListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ServiceCategoryListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceCategoryListSchemaFetcher<T, TVariables>

  readonly __typename: ServiceCategoryListSchemaFetcher<
    T & { __typename: ImplementationType<'ServiceCategoryListSchema'> },
    TVariables
  >

  readonly id: ServiceCategoryListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceCategoryListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceCategoryListSchemaFetcher<
    T & { readonly updatedAt?: string },
    TVariables
  >

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceCategoryListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly description: ServiceCategoryListSchemaFetcher<
    T & { readonly description: string },
    TVariables
  >

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ServiceCategoryListSchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly createdAt: ServiceCategoryListSchemaFetcher<
    T & { readonly createdAt: string },
    TVariables
  >

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceCategoryListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly name: ServiceCategoryListSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceCategoryListSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly parentId: ServiceCategoryListSchemaFetcher<
    T & { readonly parentId?: string },
    TVariables
  >

  'parentId+'<XAlias extends string = 'parentId', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'parentId', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~parentId': ServiceCategoryListSchemaFetcher<Omit<T, 'parentId'>, TVariables>

  readonly subcategoriesIds: ServiceCategoryListSchemaFetcher<
    T & { readonly subcategoriesIds?: ReadonlyArray<string> },
    TVariables
  >

  'subcategoriesIds+'<
    XAlias extends string = 'subcategoriesIds',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'subcategoriesIds', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<string> },
    TVariables & XDirectiveVariables
  >

  readonly '~subcategoriesIds': ServiceCategoryListSchemaFetcher<
    Omit<T, 'subcategoriesIds'>,
    TVariables
  >

  readonly servicesIds: ServiceCategoryListSchemaFetcher<
    T & { readonly servicesIds: ReadonlyArray<string> },
    TVariables
  >

  'servicesIds+'<
    XAlias extends string = 'servicesIds',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'servicesIds', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategoryListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<string> }
        : { readonly [key in XAlias]: ReadonlyArray<string> }),
    TVariables & XDirectiveVariables
  >

  readonly '~servicesIds': ServiceCategoryListSchemaFetcher<Omit<T, 'servicesIds'>, TVariables>
}

export const serviceCategoryListSchema$: ServiceCategoryListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceCategoryListSchema',
    'OBJECT',
    [],
    [
      {
        category: 'ID',
        name: 'id',
      },
      {
        category: 'SCALAR',
        name: 'updatedAt',
        undefinable: true,
      },
      'description',
      'createdAt',
      'name',
      {
        category: 'SCALAR',
        name: 'parentId',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'subcategoriesIds',
        undefinable: true,
      },
      'servicesIds',
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceCategoryListSchema$$ =
  serviceCategoryListSchema$.id.updatedAt.description.createdAt.name.parentId.subcategoriesIds
    .servicesIds
