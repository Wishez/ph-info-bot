import { IPressCategoryContext } from './IPressCategoryContext'
import { IPressProviderContext } from './IPressProviderContext'
import { IPressServiceContext } from './IPressServiceContext'

export type TCallbackContext = IPressCategoryContext | IPressServiceContext | IPressProviderContext
