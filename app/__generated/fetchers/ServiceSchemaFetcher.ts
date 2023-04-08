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
export interface ServiceSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceSchemaFetcher<
    XName extends 'ServiceSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<ImplementationType<'ServiceSchema'>, ImplementationType<XName>>
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceSchemaFetcher<T, TVariables>

  readonly __typename: ServiceSchemaFetcher<
    T & { __typename: ImplementationType<'ServiceSchema'> },
    TVariables
  >

  readonly id: ServiceSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ServiceSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly name: ServiceSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly serviceType: ServiceSchemaFetcher<T & { readonly serviceType: string }, TVariables>

  'serviceType+'<
    XAlias extends string = 'serviceType',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'serviceType', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~serviceType': ServiceSchemaFetcher<Omit<T, 'serviceType'>, TVariables>

  readonly description: ServiceSchemaFetcher<T & { readonly description: string }, TVariables>

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ServiceSchemaFetcher<Omit<T, 'description'>, TVariables>

  category<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): ServiceSchemaFetcher<T & { readonly category: X }, TVariables & XVariables>

  category<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'category',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'category', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly image: ServiceSchemaFetcher<T & { readonly image?: string }, TVariables>

  'image+'<XAlias extends string = 'image', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'image', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~image': ServiceSchemaFetcher<Omit<T, 'image'>, TVariables>

  attributes<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): ServiceSchemaFetcher<T & { readonly attributes?: ReadonlyArray<X> }, TVariables & XVariables>

  attributes<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'attributes',
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'attributes', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<X> },
    TVariables & XVariables & XDirectiveVariables
  >

  providers<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderListSchema', X, XVariables>,
  ): ServiceSchemaFetcher<T & { readonly providers: ReadonlyArray<X> }, TVariables & XVariables>

  providers<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'providers',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ProviderListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'providers', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const serviceSchema$: ServiceSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceSchema',
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
      'createdAt',
      'name',
      'serviceType',
      'description',
      {
        category: 'REFERENCE',
        name: 'category',
        targetTypeName: 'ServiceCategorySchema',
      },
      {
        category: 'SCALAR',
        name: 'image',
        undefinable: true,
      },
      {
        category: 'LIST',
        name: 'attributes',
        targetTypeName: 'ServiceAttributeSchema',
        undefinable: true,
      },
      {
        category: 'LIST',
        name: 'providers',
        targetTypeName: 'ProviderListSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceSchema$$ =
  serviceSchema$.id.updatedAt.createdAt.name.serviceType.description.image
