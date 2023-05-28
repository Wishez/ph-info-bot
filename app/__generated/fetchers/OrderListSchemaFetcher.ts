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
export interface OrderListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'OrderListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'OrderListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): OrderListSchemaFetcher<
    XName extends 'OrderListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'OrderListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'OrderListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): OrderListSchemaFetcher<T, TVariables>

  readonly __typename: OrderListSchemaFetcher<
    T & { __typename: ImplementationType<'OrderListSchema'> },
    TVariables
  >

  readonly id: OrderListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': OrderListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly number: OrderListSchemaFetcher<T & { readonly number: number }, TVariables>

  'number+'<
    XAlias extends string = 'number',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'number', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~number': OrderListSchemaFetcher<Omit<T, 'number'>, TVariables>

  readonly updatedAt: OrderListSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': OrderListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: OrderListSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': OrderListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly status: OrderListSchemaFetcher<T & { readonly status: string }, TVariables>

  'status+'<
    XAlias extends string = 'status',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'status', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~status': OrderListSchemaFetcher<Omit<T, 'status'>, TVariables>

  provider<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): OrderListSchemaFetcher<T & { readonly provider: X }, TVariables & XVariables>

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
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  client<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): OrderListSchemaFetcher<T & { readonly client: X }, TVariables & XVariables>

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
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  service<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): OrderListSchemaFetcher<T & { readonly service: X }, TVariables & XVariables>

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
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly filledServicesAttributesIds: OrderListSchemaFetcher<
    T & { readonly filledServicesAttributesIds: ReadonlyArray<string> },
    TVariables
  >

  'filledServicesAttributesIds+'<
    XAlias extends string = 'filledServicesAttributesIds',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'filledServicesAttributesIds', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<string> }
        : { readonly [key in XAlias]: ReadonlyArray<string> }),
    TVariables & XDirectiveVariables
  >

  readonly '~filledServicesAttributesIds': OrderListSchemaFetcher<
    Omit<T, 'filledServicesAttributesIds'>,
    TVariables
  >

  readonly chatId: OrderListSchemaFetcher<T & { readonly chatId: string }, TVariables>

  'chatId+'<
    XAlias extends string = 'chatId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'chatId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~chatId': OrderListSchemaFetcher<Omit<T, 'chatId'>, TVariables>

  readonly informationObjectId: OrderListSchemaFetcher<
    T & { readonly informationObjectId?: string },
    TVariables
  >

  'informationObjectId+'<
    XAlias extends string = 'informationObjectId',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'informationObjectId', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~informationObjectId': OrderListSchemaFetcher<
    Omit<T, 'informationObjectId'>,
    TVariables
  >

  readonly netProfit: OrderListSchemaFetcher<T & { readonly netProfit?: number }, TVariables>

  'netProfit+'<XAlias extends string = 'netProfit', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'netProfit', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >

  readonly '~netProfit': OrderListSchemaFetcher<Omit<T, 'netProfit'>, TVariables>

  readonly cancelingReason: OrderListSchemaFetcher<
    T & { readonly cancelingReason?: string },
    TVariables
  >

  'cancelingReason+'<
    XAlias extends string = 'cancelingReason',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'cancelingReason', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): OrderListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~cancelingReason': OrderListSchemaFetcher<Omit<T, 'cancelingReason'>, TVariables>
}

export const orderListSchema$: OrderListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'OrderListSchema',
    'OBJECT',
    [],
    [
      {
        category: 'ID',
        name: 'id',
      },
      'number',
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
      'filledServicesAttributesIds',
      'chatId',
      {
        category: 'SCALAR',
        name: 'informationObjectId',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'netProfit',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'cancelingReason',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const orderListSchema$$ =
  orderListSchema$.id.number.updatedAt.createdAt.status.filledServicesAttributesIds.chatId
    .informationObjectId.netProfit.cancelingReason
