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
export interface ServiceAttributeListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'ServiceAttributeListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'ServiceAttributeListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ServiceAttributeListSchemaFetcher<
    XName extends 'ServiceAttributeListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'ServiceAttributeListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'ServiceAttributeListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): ServiceAttributeListSchemaFetcher<T, TVariables>

  readonly __typename: ServiceAttributeListSchemaFetcher<
    T & { __typename: ImplementationType<'ServiceAttributeListSchema'> },
    TVariables
  >

  readonly id: ServiceAttributeListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': ServiceAttributeListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: ServiceAttributeListSchemaFetcher<
    T & { readonly updatedAt?: string },
    TVariables
  >

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': ServiceAttributeListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: ServiceAttributeListSchemaFetcher<
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
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': ServiceAttributeListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly notice: ServiceAttributeListSchemaFetcher<T & { readonly notice: string }, TVariables>

  'notice+'<
    XAlias extends string = 'notice',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'notice', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~notice': ServiceAttributeListSchemaFetcher<Omit<T, 'notice'>, TVariables>

  readonly isRequired: ServiceAttributeListSchemaFetcher<
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
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >

  readonly '~isRequired': ServiceAttributeListSchemaFetcher<Omit<T, 'isRequired'>, TVariables>

  readonly name: ServiceAttributeListSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': ServiceAttributeListSchemaFetcher<Omit<T, 'name'>, TVariables>

  readonly order: ServiceAttributeListSchemaFetcher<T & { readonly order: number }, TVariables>

  'order+'<
    XAlias extends string = 'order',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'order', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >

  readonly '~order': ServiceAttributeListSchemaFetcher<Omit<T, 'order'>, TVariables>

  readonly serviceId: ServiceAttributeListSchemaFetcher<
    T & { readonly serviceId?: string },
    TVariables
  >

  'serviceId+'<XAlias extends string = 'serviceId', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'serviceId', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): ServiceAttributeListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~serviceId': ServiceAttributeListSchemaFetcher<Omit<T, 'serviceId'>, TVariables>
}

export const serviceAttributeListSchema$: ServiceAttributeListSchemaFetcher<{}, {}> = createFetcher(
  createFetchableType(
    'ServiceAttributeListSchema',
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
        category: 'SCALAR',
        name: 'serviceId',
        undefinable: true,
      },
    ],
  ),
  ENUM_INPUT_METADATA,
  undefined,
)

export const serviceAttributeListSchema$$ =
  serviceAttributeListSchema$.id.updatedAt.createdAt.notice.isRequired.name.order.serviceId
