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
export interface ProviderListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ProviderListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ProviderListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ProviderListSchemaFetcher<
    XName extends 'ProviderListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ProviderListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ProviderListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ProviderListSchemaFetcher<T, TVariables>

  readonly __typename: ProviderListSchemaFetcher<
    T & { __typename: ImplementationType<'ProviderListSchema'> },
    TVariables
  >

  readonly id: ProviderListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ProviderListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ProviderListSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ProviderListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ProviderListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ProviderListSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ProviderListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly description: ProviderListSchemaFetcher<T & { readonly description: string }, TVariables>

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': ProviderListSchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly serviceId: ProviderListSchemaFetcher<T & { readonly serviceId: string }, TVariables>

  'serviceId+'<
    XAlias extends string = 'serviceId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'serviceId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ProviderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~serviceId': ProviderListSchemaFetcher<Omit<T, 'serviceId'>, TVariables>

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): ProviderListSchemaFetcher<T & { readonly user: X }, TVariables & XVariables>

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
  ): ProviderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const providerListSchema$: ProviderListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ProviderListSchema',
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

export const providerListSchema$$ = providerListSchema$.id.updatedAt.createdAt.description.serviceId
