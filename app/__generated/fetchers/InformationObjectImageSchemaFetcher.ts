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
export interface InformationObjectImageSchemaFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<'InformationObjectImageSchema', T, TVariables> {
  on<
    XName extends ImplementationType<'InformationObjectImageSchema'>,
    X extends object,
    XVariables extends object,
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string, // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InformationObjectImageSchemaFetcher<
    XName extends 'InformationObjectImageSchema'
      ? T & X
      : WithTypeName<T, ImplementationType<'InformationObjectImageSchema'>> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<'InformationObjectImageSchema'>,
                  ImplementationType<XName>
                >
              }
          ),
    TVariables & XVariables
  >

  directive(name: string, args?: DirectiveArgs): InformationObjectImageSchemaFetcher<T, TVariables>

  readonly __typename: InformationObjectImageSchemaFetcher<
    T & { __typename: ImplementationType<'InformationObjectImageSchema'> },
    TVariables
  >

  readonly id: InformationObjectImageSchemaFetcher<T & { readonly id: string }, TVariables>

  'id+'<
    XAlias extends string = 'id',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'id', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectImageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~id': InformationObjectImageSchemaFetcher<Omit<T, 'id'>, TVariables>

  readonly url: InformationObjectImageSchemaFetcher<T & { readonly url: string }, TVariables>

  'url+'<
    XAlias extends string = 'url',
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {},
  >(
    optionsConfigurer: (
      options: FieldOptions<'url', {}, {}>,
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>,
  ): InformationObjectImageSchemaFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >

  readonly '~url': InformationObjectImageSchemaFetcher<Omit<T, 'url'>, TVariables>
}

export const informationObjectImageSchema$: InformationObjectImageSchemaFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      'InformationObjectImageSchema',
      'OBJECT',
      [],
      [
        {
          category: 'ID',
          name: 'id',
        },
        'url',
      ],
    ),
    ENUM_INPUT_METADATA,
    undefined,
  )

export const informationObjectImageSchema$$ = informationObjectImageSchema$.id.url
