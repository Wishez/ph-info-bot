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
export interface OrderSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'OrderSchema', T, TVariables> {
  on<XName extends ImplementationType<'OrderSchema'>, X extends object, XVariables extends object>(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): OrderSchemaFetcher<
    XName extends 'OrderSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'OrderSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | { __typename: Exclude<ImplementationType<'OrderSchema'>, ImplementationType<XName>> }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): OrderSchemaFetcher<T, TVariables>

  readonly __typename: OrderSchemaFetcher<
    T & { __typename: ImplementationType<'OrderSchema'> },
    TVariables
  >

  readonly id: OrderSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': OrderSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: OrderSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): OrderSchemaFetcher<T & { readonly [key in XAlias]?: string }, TVariables & XDirectiveVariables>

  readonly '~updatedAt': OrderSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: OrderSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': OrderSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly status: OrderSchemaFetcher<T & { readonly status: string }, TVariables>

  'status+'<
    XAlias extends string = 'status',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'status', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~status': OrderSchemaFetcher<Omit<T, 'status'>, TVariables>

  provider<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): OrderSchemaFetcher<T & { readonly provider: X }, TVariables & XVariables>

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
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  client<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): OrderSchemaFetcher<T & { readonly client: X }, TVariables & XVariables>

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
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  service<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): OrderSchemaFetcher<T & { readonly service: X }, TVariables & XVariables>

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
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  filledServicesAttributes<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FilledServiceAttributeListSchema', X, XVariables>,
  ): OrderSchemaFetcher<
    T & { readonly filledServicesAttributes: ReadonlyArray<X> },
    TVariables & XVariables
  >

  filledServicesAttributes<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'filledServicesAttributes',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'FilledServiceAttributeListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'filledServicesAttributes', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly chatId: OrderSchemaFetcher<T & { readonly chatId: string }, TVariables>

  'chatId+'<
    XAlias extends string = 'chatId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'chatId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~chatId': OrderSchemaFetcher<Omit<T, 'chatId'>, TVariables>
}

export const orderSchema$: OrderSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'OrderSchema',
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
      'status',
      {
        category: 'REFERENCE',
        name: 'provider',
        targetTypeName: 'ProviderSchema',
      },
      {
        category: 'REFERENCE',
        name: 'client',
        targetTypeName: 'ClientSchema',
      },
      {
        category: 'REFERENCE',
        name: 'service',
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'LIST',
        name: 'filledServicesAttributes',
        targetTypeName: 'FilledServiceAttributeListSchema',
      },
      'chatId',
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const orderSchema$$ = orderSchema$.id.updatedAt.createdAt.status.chatId
