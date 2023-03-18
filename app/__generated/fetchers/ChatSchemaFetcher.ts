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
export interface ChatSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ChatSchema', T, TVariables> {
  on<XName extends ImplementationType<'ChatSchema'>, X extends object, XVariables extends object>(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ChatSchemaFetcher<
    XName extends 'ChatSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ChatSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | { __typename: Exclude<ImplementationType<'ChatSchema'>, ImplementationType<XName>> }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ChatSchemaFetcher<T, TVariables>

  readonly __typename: ChatSchemaFetcher<
    T & { __typename: ImplementationType<'ChatSchema'> },
    TVariables
  >

  readonly id: ChatSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ChatSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ChatSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ChatSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~updatedAt': ChatSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ChatSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ChatSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  messagesHistory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ChatMessageSchema', X, XVariables>,
  ): ChatSchemaFetcher<T & { readonly messagesHistory: ReadonlyArray<X> }, TVariables & XVariables>

  messagesHistory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'messagesHistory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ChatMessageSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'messagesHistory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  client<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): ChatSchemaFetcher<T & { readonly client: X }, TVariables & XVariables>

  client<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'client',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'client', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  provider<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): ChatSchemaFetcher<T & { readonly provider: X }, TVariables & XVariables>

  provider<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'provider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'provider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >
}

export const chatSchema$: ChatSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ChatSchema',
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
      {
        category: 'LIST',
        name: 'messagesHistory',
        targetTypeName: 'ChatMessageSchema',
      },
      {
        category: 'REFERENCE',
        name: 'client',
        targetTypeName: 'ClientSchema',
      },
      {
        category: 'REFERENCE',
        name: 'provider',
        targetTypeName: 'ProviderSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const chatSchema$$ = chatSchema$.id.updatedAt.createdAt
