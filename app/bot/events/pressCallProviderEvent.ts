import type { CallbackQuery } from 'node-telegram-bot-api'
import { ICallProviderContext } from '../types/context'
// import { execute } from '../../__generated'
// import {
//   query$,
//   serviceCategoryListSchema$,
//   serviceCategorySchema$,
//   serviceListSchema$,
// } from '../../__generated/fetchers'
// import { CallbackButton } from '../components'
// import { ECommonAction } from '../types/actions'
// import { IPressCategoryContext } from '../types/context'

export const pressCallProviderEvent = async (
  context: ICallProviderContext,
  query: CallbackQuery,
) => {
  console.log(context, query)
}
