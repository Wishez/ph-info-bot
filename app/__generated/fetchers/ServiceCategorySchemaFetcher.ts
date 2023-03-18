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
export interface ServiceCategorySchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceCategorySchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceCategorySchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceCategorySchemaFetcher<
    XName extends 'ServiceCategorySchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceCategorySchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ServiceCategorySchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceCategorySchemaFetcher<T, TVariables>

  readonly __typename: ServiceCategorySchemaFetcher<
    T & { __typename: ImplementationType<'ServiceCategorySchema'> },
    TVariables
  >

  readonly id: ServiceCategorySchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceCategorySchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceCategorySchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceCategorySchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly description: ServiceCategorySchemaFetcher<
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
  ): ServiceCategorySchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ServiceCategorySchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly createdAt: ServiceCategorySchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceCategorySchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly name: ServiceCategorySchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceCategorySchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly parentId: ServiceCategorySchemaFetcher<T & { readonly parentId?: string }, TVariables>

  'parentId+'<XAlias extends string = 'parentId', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'parentId', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~parentId': ServiceCategorySchemaFetcher<Omit<T, 'parentId'>, TVariables>

  subcategories<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategoryListSchema', X, XVariables>,
  ): ServiceCategorySchemaFetcher<
    T & { readonly subcategories?: ReadonlyArray<X> },
    TVariables & XVariables
  >

  subcategories<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'subcategories',
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategoryListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'subcategories', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<X> },
    TVariables & XVariables & XDirectiveVariables
  >

  services<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceListSchema', X, XVariables>,
  ): ServiceCategorySchemaFetcher<
    T & { readonly services: ReadonlyArray<X> },
    TVariables & XVariables
  >

  services<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'services',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'services', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceCategorySchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const serviceCategorySchema$: ServiceCategorySchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceCategorySchema',
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
        category: 'LIST',
        name: 'subcategories',
        targetTypeName: 'ServiceCategoryListSchema',
        undefinable: true,
      },
      {
        category: 'LIST',
        name: 'services',
        targetTypeName: 'ServiceListSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceCategorySchema$$ =
  serviceCategorySchema$.id.updatedAt.description.createdAt.name.parentId
