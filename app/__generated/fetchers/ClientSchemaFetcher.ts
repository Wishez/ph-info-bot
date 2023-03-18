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
export interface ClientSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ClientSchema', T, TVariables> {
  on<XName extends ImplementationType<'ClientSchema'>, X extends object, XVariables extends object>(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ClientSchemaFetcher<
    XName extends 'ClientSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ClientSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | { __typename: Exclude<ImplementationType<'ClientSchema'>, ImplementationType<XName>> }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ClientSchemaFetcher<T, TVariables>

  readonly __typename: ClientSchemaFetcher<
    T & { __typename: ImplementationType<'ClientSchema'> },
    TVariables
  >

  readonly id: ClientSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ClientSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ClientSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ClientSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ClientSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly rank: ClientSchemaFetcher<T & { readonly rank: string }, TVariables>

  'rank+'<
    XAlias extends string = 'rank',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'rank', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~rank': ClientSchemaFetcher<Omit<T, 'rank'>, TVariables>

  readonly createdAt: ClientSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ClientSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): ClientSchemaFetcher<T & { readonly user: X }, TVariables & XVariables>

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
  ): ClientSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const clientSchema$: ClientSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ClientSchema',
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
      'rank',
      'createdAt',
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

export const clientSchema$$ = clientSchema$.id.updatedAt.rank.createdAt
