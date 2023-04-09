import { TExtractFetcherModel } from '../../../../../types/graphql'
import { FETCH_CLIENT } from '../client'

export type TClientFetcherModel = TExtractFetcherModel<typeof FETCH_CLIENT>['client']
