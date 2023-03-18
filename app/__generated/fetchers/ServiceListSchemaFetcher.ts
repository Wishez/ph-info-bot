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
export interface ServiceListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceListSchemaFetcher<
    XName extends 'ServiceListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ServiceListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceListSchemaFetcher<T, TVariables>

  readonly __typename: ServiceListSchemaFetcher<
    T & { __typename: ImplementationType<'ServiceListSchema'> },
    TVariables
  >

  readonly id: ServiceListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceListSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ServiceListSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly name: ServiceListSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceListSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly description: ServiceListSchemaFetcher<T & { readonly description: string }, TVariables>

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ServiceListSchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly categoryId: ServiceListSchemaFetcher<T & { readonly categoryId: string }, TVariables>

  'categoryId+'<
    XAlias extends string = 'categoryId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'categoryId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~categoryId': ServiceListSchemaFetcher<Omit<T, 'categoryId'>, TVariables>

  readonly image: ServiceListSchemaFetcher<T & { readonly image?: string }, TVariables>

  'image+'<XAlias extends string = 'image', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'image', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~image': ServiceListSchemaFetcher<Omit<T, 'image'>, TVariables>

  readonly attributesIds: ServiceListSchemaFetcher<
    T & { readonly attributesIds: ReadonlyArray<string> },
    TVariables
  >

  'attributesIds+'<
    XAlias extends string = 'attributesIds',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'attributesIds', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<string> }
        : { readonly [key in XAlias]: ReadonlyArray<string> }),
    TVariables & XDirectiveVariables
  >

  readonly '~attributesIds': ServiceListSchemaFetcher<Omit<T, 'attributesIds'>, TVariables>

  readonly providersIds: ServiceListSchemaFetcher<
    T & { readonly providersIds: ReadonlyArray<string> },
    TVariables
  >

  'providersIds+'<
    XAlias extends string = 'providersIds',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'providersIds', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<string> }
        : { readonly [key in XAlias]: ReadonlyArray<string> }),
    TVariables & XDirectiveVariables
  >

  readonly '~providersIds': ServiceListSchemaFetcher<Omit<T, 'providersIds'>, TVariables>
}

export const serviceListSchema$: ServiceListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceListSchema',
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
      'description',
      'categoryId',
      {
        category: 'SCALAR',
        name: 'image',
        undefinable: true,
      },
      'attributesIds',
      'providersIds',
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceListSchema$$ =
  serviceListSchema$.id.updatedAt.createdAt.name.description.categoryId.image.attributesIds
    .providersIds
