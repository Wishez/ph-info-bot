import type {
  AcceptableVariables,
  DirectiveArgs,
  FieldOptions,
  ObjectFetcher,
  UnresolvedVariables,
} from 'graphql-ts-client-api'
import { createFetchableType, createFetcher } from 'graphql-ts-client-api'
import { ENUM_INPUT_METADATA } from '../EnumInputMetadata'

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface QueryFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'Query', T, TVariables> {
  directive(name: string, args?: DirectiveArgs): QueryFetcher<T, TVariables>

  clients<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientListSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly clients: ReadonlyArray<X> }, TVariables & XVariables>

  clients<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'clients',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ClientListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'clients', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  client<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly client: X }, TVariables & XVariables & QueryArgs['client']>

  client<
    XArgs extends AcceptableVariables<QueryArgs['client']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly client: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['client']>
  >

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
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['client'] & XDirectiveVariables
  >

  client<
    XArgs extends AcceptableVariables<QueryArgs['client']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'client',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'client', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['client']> & XDirectiveVariables
  >

  clientById<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly clientById: X }, TVariables & XVariables & QueryArgs['clientById']>

  clientById<
    XArgs extends AcceptableVariables<QueryArgs['clientById']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly clientById: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['clientById']>
  >

  clientById<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'clientById',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'clientById', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['clientById'] & XDirectiveVariables
  >

  clientById<
    XArgs extends AcceptableVariables<QueryArgs['clientById']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'clientById',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ClientSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'clientById', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['clientById']> &
      XDirectiveVariables
  >

  serviceCategories<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategoryListSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly serviceCategories: ReadonlyArray<X> }, TVariables & XVariables>

  serviceCategories<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceCategories',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategoryListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceCategories', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  serviceCategory<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly serviceCategory: X },
    TVariables & XVariables & QueryArgs['serviceCategory']
  >

  serviceCategory<
    XArgs extends AcceptableVariables<QueryArgs['serviceCategory']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly serviceCategory: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['serviceCategory']>
  >

  serviceCategory<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['serviceCategory'] & XDirectiveVariables
  >

  serviceCategory<
    XArgs extends AcceptableVariables<QueryArgs['serviceCategory']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceCategory',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceCategorySchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceCategory', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['serviceCategory']> &
      XDirectiveVariables
  >

  services<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceListSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly services: ReadonlyArray<X> }, TVariables & XVariables>

  services<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'services',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'services', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  service<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly service: X }, TVariables & XVariables & QueryArgs['service']>

  service<
    XArgs extends AcceptableVariables<QueryArgs['service']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly service: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['service']>
  >

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
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['service'] & XDirectiveVariables
  >

  service<
    XArgs extends AcceptableVariables<QueryArgs['service']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'service',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'service', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['service']> & XDirectiveVariables
  >

  providers<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly providers: ReadonlyArray<X> }, TVariables & XVariables>

  providers<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'providers',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'providers', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  provider<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly provider: X }, TVariables & XVariables & QueryArgs['provider']>

  provider<
    XArgs extends AcceptableVariables<QueryArgs['provider']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly provider: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['provider']>
  >

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
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['provider'] & XDirectiveVariables
  >

  provider<
    XArgs extends AcceptableVariables<QueryArgs['provider']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'provider',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ProviderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'provider', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['provider']> &
      XDirectiveVariables
  >

  chats<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly chats: ReadonlyArray<X> }, TVariables & XVariables>

  chats<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'chats',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'chats', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  chat<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly chat: X }, TVariables & XVariables & QueryArgs['chat']>

  chat<
    XArgs extends AcceptableVariables<QueryArgs['chat']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly chat: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['chat']>
  >

  chat<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'chat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'chat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['chat'] & XDirectiveVariables
  >

  chat<
    XArgs extends AcceptableVariables<QueryArgs['chat']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'chat',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ChatSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'chat', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['chat']> & XDirectiveVariables
  >

  filledServiceAttributes<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly filledServiceAttributes: ReadonlyArray<X> },
    TVariables & XVariables
  >

  filledServiceAttributes<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'filledServiceAttributes',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'filledServiceAttributes', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  filledServiceAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly filledServiceAttribute: X },
    TVariables & XVariables & QueryArgs['filledServiceAttribute']
  >

  filledServiceAttribute<
    XArgs extends AcceptableVariables<QueryArgs['filledServiceAttribute']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly filledServiceAttribute: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['filledServiceAttribute']>
  >

  filledServiceAttribute<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'filledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'filledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['filledServiceAttribute'] & XDirectiveVariables
  >

  filledServiceAttribute<
    XArgs extends AcceptableVariables<QueryArgs['filledServiceAttribute']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'filledServiceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'FilledServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'filledServiceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['filledServiceAttribute']> &
      XDirectiveVariables
  >

  orders<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderListSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly orders: ReadonlyArray<X> }, TVariables & XVariables>

  orders<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'orders',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'orders', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  order<X extends object, XVariables extends object>(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly order: X }, TVariables & XVariables & QueryArgs['order']>

  order<
    XArgs extends AcceptableVariables<QueryArgs['order']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly order: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['order']>
  >

  order<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['order'] & XDirectiveVariables
  >

  order<
    XArgs extends AcceptableVariables<QueryArgs['order']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'OrderSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['order']> & XDirectiveVariables
  >

  checkOrderExistence(): QueryFetcher<
    T & { readonly checkOrderExistence?: string },
    TVariables & QueryArgs['checkOrderExistence']
  >

  checkOrderExistence<XArgs extends AcceptableVariables<QueryArgs['checkOrderExistence']>>(
    args: XArgs,
  ): QueryFetcher<
    T & { readonly checkOrderExistence?: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs['checkOrderExistence']>
  >

  checkOrderExistence<
    XAlias extends string = 'checkOrderExistence',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'checkOrderExistence', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & QueryArgs['checkOrderExistence'] & XDirectiveVariables
  >

  checkOrderExistence<
    XArgs extends AcceptableVariables<QueryArgs['checkOrderExistence']>,
    XAlias extends string = 'checkOrderExistence',
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'checkOrderExistence', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs['checkOrderExistence']> & XDirectiveVariables
  >

  isAllRequiredAttributesFilled(): QueryFetcher<
    T & { readonly isAllRequiredAttributesFilled: boolean },
    TVariables & QueryArgs['isAllRequiredAttributesFilled']
  >

  isAllRequiredAttributesFilled<
    XArgs extends AcceptableVariables<QueryArgs['isAllRequiredAttributesFilled']>,
  >(
    args: XArgs,
  ): QueryFetcher<
    T & { readonly isAllRequiredAttributesFilled: boolean },
    TVariables & UnresolvedVariables<XArgs, QueryArgs['isAllRequiredAttributesFilled']>
  >

  isAllRequiredAttributesFilled<
    XAlias extends string = 'isAllRequiredAttributesFilled',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'isAllRequiredAttributesFilled', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & QueryArgs['isAllRequiredAttributesFilled'] & XDirectiveVariables
  >

  isAllRequiredAttributesFilled<
    XArgs extends AcceptableVariables<QueryArgs['isAllRequiredAttributesFilled']>,
    XAlias extends string = 'isAllRequiredAttributesFilled',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<'isAllRequiredAttributesFilled', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs['isAllRequiredAttributesFilled']> &
      XDirectiveVariables
  >

  serviceAttributes<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceAttributeListSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly serviceAttributes: ReadonlyArray<X> }, TVariables & XVariables>

  serviceAttributes<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceAttributes',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceAttributeListSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceAttributes', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  serviceAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly serviceAttribute: X },
    TVariables & XVariables & QueryArgs['serviceAttribute']
  >

  serviceAttribute<
    XArgs extends AcceptableVariables<QueryArgs['serviceAttribute']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly serviceAttribute: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['serviceAttribute']>
  >

  serviceAttribute<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['serviceAttribute'] & XDirectiveVariables
  >

  serviceAttribute<
    XArgs extends AcceptableVariables<QueryArgs['serviceAttribute']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'serviceAttribute',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'serviceAttribute', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs['serviceAttribute']> &
      XDirectiveVariables
  >

  users<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly users: ReadonlyArray<X> }, TVariables & XVariables>

  users<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'users',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'users', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): QueryFetcher<T & { readonly user: X }, TVariables & XVariables & QueryArgs['user']>

  user<
    XArgs extends AcceptableVariables<QueryArgs['user']>,
    X extends object,
    XVariables extends object,
  >(
    args: XArgs,
    child: ObjectFetcher<'UserSchema', X, XVariables>,
  ): QueryFetcher<
    T & { readonly user: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['user']>
  >

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
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs['user'] & XDirectiveVariables
  >

  user<
    XArgs extends AcceptableVariables<QueryArgs['user']>,
    X extends object,
    XVariables extends object,
    XAlias extends string = 'user',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    args: XArgs,
    child: ObjectFetcher<'UserSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'user', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs['user']> & XDirectiveVariables
  >
}

export const query$: QueryFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'Query',
    'OBJECT',
    [],
    [
      {
        category: 'LIST',
        name: 'clients',
        targetTypeName: 'ClientListSchema',
      },
      {
        category: 'REFERENCE',
        name: 'client',
        argGraphQLTypeMap: { telegramId: 'Float!' },
        targetTypeName: 'ClientSchema',
      },
      {
        category: 'REFERENCE',
        name: 'clientById',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ClientSchema',
      },
      {
        category: 'LIST',
        name: 'serviceCategories',
        targetTypeName: 'ServiceCategoryListSchema',
      },
      {
        category: 'REFERENCE',
        name: 'serviceCategory',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ServiceCategorySchema',
      },
      {
        category: 'LIST',
        name: 'services',
        targetTypeName: 'ServiceListSchema',
      },
      {
        category: 'REFERENCE',
        name: 'service',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ServiceSchema',
      },
      {
        category: 'LIST',
        name: 'providers',
        targetTypeName: 'ProviderSchema',
      },
      {
        category: 'REFERENCE',
        name: 'provider',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ProviderSchema',
      },
      {
        category: 'LIST',
        name: 'chats',
        targetTypeName: 'ChatSchema',
      },
      {
        category: 'REFERENCE',
        name: 'chat',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ChatSchema',
      },
      {
        category: 'LIST',
        name: 'filledServiceAttributes',
        targetTypeName: 'FilledServiceAttributeSchema',
      },
      {
        category: 'REFERENCE',
        name: 'filledServiceAttribute',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'FilledServiceAttributeSchema',
      },
      {
        category: 'LIST',
        name: 'orders',
        targetTypeName: 'OrderListSchema',
      },
      {
        category: 'REFERENCE',
        name: 'order',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'OrderSchema',
      },
      {
        category: 'SCALAR',
        name: 'checkOrderExistence',
        argGraphQLTypeMap: {
          clientId: 'String!',
          providerId: 'String!',
        },
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'isAllRequiredAttributesFilled',
        argGraphQLTypeMap: { id: 'String!' },
      },
      {
        category: 'LIST',
        name: 'serviceAttributes',
        targetTypeName: 'ServiceAttributeListSchema',
      },
      {
        category: 'REFERENCE',
        name: 'serviceAttribute',
        argGraphQLTypeMap: { id: 'String!' },
        targetTypeName: 'ServiceAttributeSchema',
      },
      {
        category: 'LIST',
        name: 'users',
        targetTypeName: 'UserSchema',
      },
      {
        category: 'REFERENCE',
        name: 'user',
        argGraphQLTypeMap: { telegramId: 'Float!' },
        targetTypeName: 'UserSchema',
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export interface QueryArgs {
  readonly client: {
    readonly telegramId: number
  }

  readonly clientById: {
    readonly id: string
  }

  readonly serviceCategory: {
    readonly id: string
  }

  readonly service: {
    readonly id: string
  }

  readonly provider: {
    readonly id: string
  }

  readonly chat: {
    readonly id: string
  }

  readonly filledServiceAttribute: {
    readonly id: string
  }

  readonly order: {
    readonly id: string
  }

  readonly checkOrderExistence: {
    readonly clientId: string
    readonly providerId: string
  }

  readonly isAllRequiredAttributesFilled: {
    readonly id: string
  }

  readonly serviceAttribute: {
    readonly id: string
  }

  readonly user: {
    readonly telegramId: number
  }
}
