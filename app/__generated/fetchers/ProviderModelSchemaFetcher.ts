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
export interface ProviderModelSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ProviderModelSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ProviderModelSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ProviderModelSchemaFetcher<
    XName extends 'ProviderModelSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ProviderModelSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ProviderModelSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ProviderModelSchemaFetcher<T, TVariables>

  readonly __typename: ProviderModelSchemaFetcher<
    T & { __typename: ImplementationType<'ProviderModelSchema'> },
    TVariables
  >

  readonly id: ProviderModelSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ProviderModelSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ProviderModelSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ProviderModelSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ProviderModelSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ProviderModelSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly description: ProviderModelSchemaFetcher<T & { readonly description: string }, TVariables>

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ProviderModelSchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly serviceId: ProviderModelSchemaFetcher<T & { readonly serviceId: string }, TVariables>

  'serviceId+'<
    XAlias extends string = 'serviceId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'serviceId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~serviceId': ProviderModelSchemaFetcher<Omit<T, 'serviceId'>, TVariables>

  readonly userId: ProviderModelSchemaFetcher<T & { readonly userId: string }, TVariables>

  'userId+'<
    XAlias extends string = 'userId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'userId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~userId': ProviderModelSchemaFetcher<Omit<T, 'userId'>, TVariables>

  readonly informationObjectsIds: ProviderModelSchemaFetcher<
    T & { readonly informationObjectsIds?: ReadonlyArray<string> },
    TVariables
  >

  'informationObjectsIds+'<
    XAlias extends string = 'informationObjectsIds',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'informationObjectsIds', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ProviderModelSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<string> },
    TVariables & XDirectiveVariables
  >

  readonly '~informationObjectsIds': ProviderModelSchemaFetcher<
    Omit<T, 'informationObjectsIds'>,
    TVariables
  >
}

export const providerModelSchema$: ProviderModelSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ProviderModelSchema',
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
      'description',
      'serviceId',
      'userId',
      {
        category: 'SCALAR',
        name: 'informationObjectsIds',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const providerModelSchema$$ =
  providerModelSchema$.id.updatedAt.createdAt.description.serviceId.userId.informationObjectsIds
