import { QueryFetcher } from '../../__generated/fetchers'

export type TExtractFetcherModel<GType> = GType extends QueryFetcher<infer GModel, any>
  ? GModel
  : never
