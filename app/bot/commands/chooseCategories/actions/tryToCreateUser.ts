import type TelegramBot from 'node-telegram-bot-api'
import { execute } from '../../../../__generated'
import { mutation$, query$, userSchema$ } from '../../../../__generated/fetchers'
import { isGarphqlErrorResponse } from '../../../../graphql/typeguards'
import { EClientRank } from '../../../../models/Client/types/EClientRank'
import { getUserPhoto } from '../../../api/user'
import { bot } from '../../../index'

const CREATE_USER = mutation$.createUser()
const CREATE_CLIENT = mutation$.createClient()
const FETCH_USER = query$.user(userSchema$.name.id.telegramId)

export const tryToCreateUser = async (user: TelegramBot.User) => {
  try {
    const fetchingUserResponse = await execute(FETCH_USER, {
      variables: { telegramId: user.id },
    })
    console.log(`User ${fetchingUserResponse.user.name} has visited us!`)
  } catch (fetchingError: unknown) {
    if (isGarphqlErrorResponse(fetchingError) && fetchingError.errors[0]?.path?.includes('user')) {
      const avatarUrl = await getUserPhoto(user.id)

      try {
        const name = [user.first_name, user.last_name].filter(Boolean).join(' ')
        const creationUserResponse = await execute(CREATE_USER, {
          variables: {
            userInfo: {
              telegramId: user.id,
              name,
              username: user.username,
              avatar: avatarUrl,
            },
          },
        })
        const userId = creationUserResponse.createUser
        await execute(CREATE_CLIENT, {
          variables: { clientInfo: { userId, rank: EClientRank.NEW } },
        })

        await bot.sendMessage(
          user.id,
          `
Привет, ${name}!

Я зарегистрировал вас в системе. Буду рад обслуживать вас🫶🏼
        `,
        )
      } catch (creationError) {
        console.log(creationError)
      }
    }
  }
}
