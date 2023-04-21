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
export interface UserSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'UserSchema', T, TVariables> {
  on<XName extends ImplementationType<'UserSchema'>, X extends object, XVariables extends object>(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): UserSchemaFetcher<
    XName extends 'UserSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'UserSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | { __typename: Exclude<ImplementationType<'UserSchema'>, ImplementationType<XName>> }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): UserSchemaFetcher<T, TVariables>

  readonly __typename: UserSchemaFetcher<
    T & { __typename: ImplementationType<'UserSchema'> },
    TVariables
  >

  readonly id: UserSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': UserSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly avatar: UserSchemaFetcher<T & { readonly avatar?: string }, TVariables>

  'avatar+'<XAlias extends string = 'avatar', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'avatar', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~avatar': UserSchemaFetcher<Omit<T, 'avatar'>, TVariables>

  readonly phone: UserSchemaFetcher<T & { readonly phone?: string }, TVariables>

  'phone+'<XAlias extends string = 'phone', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'phone', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~phone': UserSchemaFetcher<Omit<T, 'phone'>, TVariables>

  readonly email: UserSchemaFetcher<T & { readonly email?: string }, TVariables>

  'email+'<XAlias extends string = 'email', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'email', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~email': UserSchemaFetcher<Omit<T, 'email'>, TVariables>

  readonly telegramId: UserSchemaFetcher<T & { readonly telegramId: number }, TVariables>

  'telegramId+'<
    XAlias extends string = 'telegramId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'telegramId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~telegramId': UserSchemaFetcher<Omit<T, 'telegramId'>, TVariables>

  readonly name: UserSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': UserSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly createdAt: UserSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': UserSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly updatedAt: UserSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~updatedAt': UserSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly username: UserSchemaFetcher<T & { readonly username?: string }, TVariables>

  'username+'<XAlias extends string = 'username', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'username', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~username': UserSchemaFetcher<Omit<T, 'username'>, TVariables>

  readonly currentChatId: UserSchemaFetcher<T & { readonly currentChatId?: string }, TVariables>

  'currentChatId+'<
    XAlias extends string = 'currentChatId',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'currentChatId', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~currentChatId': UserSchemaFetcher<Omit<T, 'currentChatId'>, TVariables>

  providers<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderModelSchema', X, XVariables>,
  ): UserSchemaFetcher<T & { readonly providers?: ReadonlyArray<X> }, TVariables & XVariables>

  providers<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'providers',
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ProviderModelSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'providers', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<X> },
    TVariables & XVariables & XDirectiveVariables
  >

  orders<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): UserSchemaFetcher<T & { readonly orders?: ReadonlyArray<X> }, TVariables & XVariables>

  orders<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'orders',
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'orders', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): UserSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<X> },
    TVariables & XVariables & XDirectiveVariables
  >
}

export const userSchema$: UserSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'UserSchema',
    'OBJECT',
    [],
    [
      {
        category: 'ID',
        name: 'id',
      },
      {
        category: 'SCALAR',
        name: 'avatar',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'phone',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'email',
        undefinable: true,
      },
      'telegramId',
      'name',
      'createdAt',
      {
        category: 'SCALAR',
        name: 'updatedAt',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'username',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'currentChatId',
        undefinable: true,
      },
      {
        category: 'LIST',
        name: 'providers',
        targetTypeName: 'ProviderModelSchema',
        undefinable: true,
      },
      {
        category: 'LIST',
        name: 'orders',
        targetTypeName: 'OrderSchema',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const userSchema$$ =
  userSchema$.id.avatar.phone.email.telegramId.name.createdAt.updatedAt.username.currentChatId
