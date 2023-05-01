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
export interface FilledServiceAttributeSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'FilledServiceAttributeSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'FilledServiceAttributeSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FilledServiceAttributeSchemaFetcher<
    XName extends 'FilledServiceAttributeSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'FilledServiceAttributeSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'FilledServiceAttributeSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): FilledServiceAttributeSchemaFetcher<T, TVariables>

  readonly __typename: FilledServiceAttributeSchemaFetcher<
    T & { __typename: ImplementationType<'FilledServiceAttributeSchema'> },
    TVariables
  >

  readonly id: FilledServiceAttributeSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': FilledServiceAttributeSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: FilledServiceAttributeSchemaFetcher<
    T & { readonly updatedAt?: string },
    TVariables
  >

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': FilledServiceAttributeSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: FilledServiceAttributeSchemaFetcher<
    T & { readonly createdAt: string },
    TVariables
  >

  'createdAt+'<
    XAlias extends string = 'createdAt',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'createdAt', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': FilledServiceAttributeSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly value: FilledServiceAttributeSchemaFetcher<T & { readonly value: string }, TVariables>

  'value+'<
    XAlias extends string = 'value',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'value', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~value': FilledServiceAttributeSchemaFetcher<Omit<T, 'value'>, TVariables>

  readonly orderId: FilledServiceAttributeSchemaFetcher<
    T & { readonly orderId: string },
    TVariables
  >

  'orderId+'<
    XAlias extends string = 'orderId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'orderId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~orderId': FilledServiceAttributeSchemaFetcher<Omit<T, 'orderId'>, TVariables>

  serviceAttribute<X extends object, XVariables extends object>(
    child: ObjectFetcher<'ServiceAttributeSchema', X, XVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T & { readonly serviceAttribute: X },
    TVariables & XVariables
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
  ): FilledServiceAttributeSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly replyMessageIds: FilledServiceAttributeSchemaFetcher<
    T & { readonly replyMessageIds?: ReadonlyArray<number> },
    TVariables
  >

  'replyMessageIds+'<
    XAlias extends string = 'replyMessageIds',
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'replyMessageIds', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): FilledServiceAttributeSchemaFetcher<
    T & { readonly [key in XAlias]?: ReadonlyArray<number> },
    TVariables & XDirectiveVariables
  >

  readonly '~replyMessageIds': FilledServiceAttributeSchemaFetcher<
    Omit<T, 'replyMessageIds'>,
    TVariables
  >
}

export const filledServiceAttributeSchema$: FilledServiceAttributeSchemaFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      'FilledServiceAttributeSchema',
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
        'value',
        'orderId',
        {
          category: 'REFERENCE',
          name: 'serviceAttribute',
          targetTypeName: 'ServiceAttributeSchema',
        },
        {
          category: 'SCALAR',
          name: 'replyMessageIds',
          undefinable: true,
        },
      ],
    ),
    ENUM_INPUT_METADATA,
    undefined,
  )

export const filledServiceAttributeSchema$$ =
  filledServiceAttributeSchema$.id.updatedAt.createdAt.value.orderId.replyMessageIds
