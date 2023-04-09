import { ICallProviderContext } from './ICallProviderContext'
import { IPressCategoryContext } from './IPressCategoryContext'
import { IPressInformationObjectContext } from './IPressInformationObjectContext'
import { IPressProviderContext } from './IPressProviderContext'
import { IPressServiceContext } from './IPressServiceContext'

export type TCallbackContext =
  | IPressCategoryContext
  | IPressServiceContext
  | IPressProviderContext
  | IPressInformationObjectContext
  | ICallProviderContext
