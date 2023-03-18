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
export interface ChatMessageSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ChatMessageSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ChatMessageSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ChatMessageSchemaFetcher<
    XName extends 'ChatMessageSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ChatMessageSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ChatMessageSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ChatMessageSchemaFetcher<T, TVariables>

  readonly __typename: ChatMessageSchemaFetcher<
    T & { __typename: ImplementationType<'ChatMessageSchema'> },
    TVariables
  >

  readonly message: ChatMessageSchemaFetcher<T & { readonly message: string }, TVariables>

  'message+'<
    XAlias extends string = 'message',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'message', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatMessageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~message': ChatMessageSchemaFetcher<Omit<T, 'message'>, TVariables>

  readonly id: ChatMessageSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatMessageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ChatMessageSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly sender: ChatMessageSchemaFetcher<T & { readonly sender: string }, TVariables>

  'sender+'<
    XAlias extends string = 'sender',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'sender', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatMessageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~sender': ChatMessageSchemaFetcher<Omit<T, 'sender'>, TVariables>

  readonly createdAt: ChatMessageSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ChatMessageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ChatMessageSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly updatedAt: ChatMessageSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ChatMessageSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ChatMessageSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>
}

export const chatMessageSchema$: ChatMessageSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ChatMessageSchema',
    'OBJECT',
    [],
    [
      'message',
      {
        category: 'ID',
        name: 'id',
      },
      'sender',
      'createdAt',
      {
        category: 'SCALAR',
        name: 'updatedAt',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const chatMessageSchema$$ = chatMessageSchema$.message.id.sender.createdAt.updatedAt
