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
export interface ServiceAttributeSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceAttributeSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceAttributeSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceAttributeSchemaFetcher<
    XName extends 'ServiceAttributeSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceAttributeSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ServiceAttributeSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceAttributeSchemaFetcher<T, TVariables>

  readonly __typename: ServiceAttributeSchemaFetcher<
    T & { __typename: ImplementationType<'ServiceAttributeSchema'> },
    TVariables
  >

  readonly id: ServiceAttributeSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceAttributeSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceAttributeSchemaFetcher<T & { readonly updatedAt?: string }, TVariables>

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceAttributeSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ServiceAttributeSchemaFetcher<T & { readonly createdAt: string }, TVariables>

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceAttributeSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly notice: ServiceAttributeSchemaFetcher<T & { readonly notice: string }, TVariables>

  'notice+'<
    XAlias extends string = 'notice',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'notice', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~notice': ServiceAttributeSchemaFetcher<Omit<T, 'notice'>, TVariables>

  readonly isRequired: ServiceAttributeSchemaFetcher<
    T & { readonly isRequired: boolean },
    TVariables
  >

  'isRequired+'<
    XAlias extends string = 'isRequired',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'isRequired', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >

  readonly '~isRequired': ServiceAttributeSchemaFetcher<Omit<T, 'isRequired'>, TVariables>

  readonly name: ServiceAttributeSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceAttributeSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly order: ServiceAttributeSchemaFetcher<T & { readonly order: number }, TVariables>

  'order+'<
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~order': ServiceAttributeSchemaFetcher<Omit<T, 'order'>, TVariables>

  service<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
  ): ServiceAttributeSchemaFetcher<T & { readonly service?: X }, TVariables & XVariables>

  service<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'service',
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'ServiceSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'service', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >

  readonly options: ServiceAttributeSchemaFetcher<
    T & { readonly options?: ReadonlyArray<string> },
    TVariables
  >

  'options+'<XAlias extends string = 'options', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'options', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceAttributeSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<string> },
    TVariables & XDirectiveVariables
  >

  readonly '~options': ServiceAttributeSchemaFetcher<Omit<T, 'options'>, TVariables>
}

export const serviceAttributeSchema$: ServiceAttributeSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceAttributeSchema',
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
      'notice',
      'isRequired',
      'name',
      'order',
      {
        category: 'REFERENCE',
        name: 'service',
        targetTypeName: 'ServiceSchema',
        undefinable: true,
      },
      {
        category: 'SCALAR',
        name: 'options',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceAttributeSchema$$ =
  serviceAttributeSchema$.id.updatedAt.createdAt.notice.isRequired.name.order.options
