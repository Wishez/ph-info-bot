import { TExtractFetcherModel } from '../../../../../types/graphql'
import { FETCH_PROVIDER } from '../provider'

export type TProviderFetcherModel = TExtractFetcherModel<typeof FETCH_PROVIDER>['provider']
