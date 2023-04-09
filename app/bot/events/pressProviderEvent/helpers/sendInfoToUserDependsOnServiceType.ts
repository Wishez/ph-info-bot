import { EServiceType } from '../../../../models/Service/types'
import { IUserModel } from '../../../../models/User/types'
import { TOrderFetcherModel, TProviderFetcherModel } from '../fetchers/types'
import { sendOrderForm } from './sendOrderForm'
import { sendProviderPortfolioVariants } from './sendProviderPortfolioVariants'

interface IOptions {
  provider: TProviderFetcherModel
  order: TOrderFetcherModel
  receiver: IUserModel['telegramId']
}

export const sendInfoToUserDependsOnServiceType = async (options: IOptions) => {
  const { receiver, order, provider } = options

  switch (provider.service.serviceType) {
    case EServiceType.FORM:
      await sendOrderForm({ order, receiver })
      break
    case EServiceType.PORTFOLIO:
      await sendProviderPortfolioVariants({ order, provider, receiver })
      break
  }
}
