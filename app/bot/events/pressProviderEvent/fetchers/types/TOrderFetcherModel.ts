import { TExtractFetcherModel } from '../../../../../types/graphql'
import { FETCH_ORDER } from '../order'

export type TOrderFetcherModel = TExtractFetcherModel<typeof FETCH_ORDER>['order']
