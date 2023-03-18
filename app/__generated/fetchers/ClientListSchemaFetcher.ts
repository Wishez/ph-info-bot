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
export interface ClientListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ClientListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ClientListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ClientListSchemaFetcher<
    XName extends 'ClientListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ClientListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ClientListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ClientListSchemaFetcher<T, TVariables>

  readonly __typename: ClientListSchemaFetcher<
    T & { __typename: ImplementationType<'ClientListSchema'> },
    TVariables
  >

  readonly id: ClientListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ClientListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ClientListSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ClientListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ClientListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly rank: ClientListSchemaFetcher<T & { readonly rank: string }, TVariables>

  'rank+'<
    XAlias extends string = 'rank',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'rank', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~rank': ClientListSchemaFetcher<Omit<T, 'rank'>, TVariables>

  readonly createdAt: ClientListSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ClientListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly userId: ClientListSchemaFetcher<T & { readonly userId: string }, TVariables>

  'userId+'<
    XAlias extends string = 'userId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'userId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ClientListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~userId': ClientListSchemaFetcher<Omit<T, 'userId'>, TVariables>
}

export const clientListSchema$: ClientListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ClientListSchema',
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
      'userId',
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const clientListSchema$$ = clientListSchema$.id.updatedAt.rank.createdAt.userId
