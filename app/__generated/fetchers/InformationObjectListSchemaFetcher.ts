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
export interface InformationObjectListSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'InformationObjectListSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'InformationObjectListSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InformationObjectListSchemaFetcher<
    XName extends 'InformationObjectListSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'InformationObjectListSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'InformationObjectListSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): InformationObjectListSchemaFetcher<T, TVariables>

  readonly __typename: InformationObjectListSchemaFetcher<
    T & { __typename: ImplementationType<'InformationObjectListSchema'> },
    TVariables
  >

  readonly id: InformationObjectListSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': InformationObjectListSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly updatedAt: InformationObjectListSchemaFetcher<
    T & { readonly updatedAt?: string },
    TVariables
  >

  'updatedAt+'<XAlias extends string = 'updatedAt', XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<'updatedAt', {}, {}>,
    ) => FieldOptions<XAlias, { readonly [key: string]: DirectiveArgs }, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >

  readonly '~updatedAt': InformationObjectListSchemaFetcher<Omit<T, 'updatedAt'>, TVariables>

  readonly createdAt: InformationObjectListSchemaFetcher<
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
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~createdAt': InformationObjectListSchemaFetcher<Omit<T, 'createdAt'>, TVariables>

  readonly description: InformationObjectListSchemaFetcher<
    T & { readonly description: string },
    TVariables
  >

  'description+'<
    XAlias extends string = 'description',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'description', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~description': InformationObjectListSchemaFetcher<Omit<T, 'description'>, TVariables>

  readonly name: InformationObjectListSchemaFetcher<T & { readonly name: string }, TVariables>

  'name+'<
    XAlias extends string = 'name',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'name', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~name': InformationObjectListSchemaFetcher<Omit<T, 'name'>, TVariables>

  gallery<X extends object, XVariables extends object>(
    child: ObjectFetcher<'InformationObjectImageSchema', X, XVariables>,
  ): InformationObjectListSchemaFetcher<
    T & { readonly gallery: ReadonlyArray<X> },
    TVariables & XVariables
  >

  gallery<
    X extends object,
    XVariables extends object,
    XAlias extends string = 'gallery',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    child: ObjectFetcher<'InformationObjectImageSchema', X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<'gallery', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ReadonlyArray<X> }
        : { readonly [key in XAlias]: ReadonlyArray<X> }),
    TVariables & XVariables & XDirectiveVariables
  >

  readonly providerId: InformationObjectListSchemaFetcher<
    T & { readonly providerId: string },
    TVariables
  >

  'providerId+'<
    XAlias extends string = 'providerId',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'providerId', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectListSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~providerId': InformationObjectListSchemaFetcher<Omit<T, 'providerId'>, TVariables>
}

export const informationObjectListSchema$: InformationObjectListSchemaFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      'InformationObjectListSchema',
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
        'description',
        'name',
        {
          category: 'LIST',
          name: 'gallery',
          targetTypeName: 'InformationObjectImageSchema',
        },
        'providerId',
      ],
    ),
    ENUM_INPUT_METADATA,
    undefined,
  )

export const informationObjectListSchema$$ =
  informationObjectListSchema$.id.updatedAt.createdAt.description.name.providerId
