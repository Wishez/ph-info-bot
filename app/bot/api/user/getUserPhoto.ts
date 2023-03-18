import last from 'lodash/last'
import { IUserModel } from '../../../models/User/types'
import { bot } from '../../index'

export const getUserPhoto = async (telegramId: IUserModel['telegramId']) => {
  const profilePhotos = await bot.getUserProfilePhotos(telegramId, { offset: 0, limit: 1 })
  const avatarFileId = last(profilePhotos.photos[0])?.file_id

  return (
    avatarFileId ||
    'https://petcostumecenter.com/wp-content/uploads/2020/05/580413_PS_PAW_BILL_SUIT-scaled.jpg'
  )
}
