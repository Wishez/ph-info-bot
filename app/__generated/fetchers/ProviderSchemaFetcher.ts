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
export interface ProviderSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ProviderSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ProviderSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ProviderSchemaFetcher<
    XName extends 'ProviderSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ProviderSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<ImplementationType<'ProviderSchema'>, ImplementationType<XName>>
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ProviderSchemaFetcher<T, TVariables>

  readonly __typename: ProviderSchemaFetcher<
    T & { __typename: ImplementationType<'ProviderSchema'> },
    TVariables
  >

  readonly id: ProviderSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ProviderSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ProviderSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ProviderSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ProviderSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ProviderSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly description: ProviderSchemaFetcher<T & { readonly description: string }, TVariables>

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ProviderSchemaFetcher<Omit<T, 'description'>, TVariables>

  service<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): ProviderSchemaFetcher<T & { readonly service: X }, TVariables & XVariables>

  service<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'service',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'service', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): ProviderSchemaFetcher<T & { readonly user: X }, TVariables & XVariables>

  user<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'user',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'user', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const providerSchema$: ProviderSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ProviderSchema',
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
      {
        category: 'REFERENCE',
        name: 'service',
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'REFERENCE',
        name: 'user',
        targetTypeName: 'UserSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const providerSchema$$ = providerSchema$.id.updatedAt.createdAt.description
