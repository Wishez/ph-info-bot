import 'reflect-metadata'
import { bot } from './bot'
import { startServer } from './server'

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match?.[1]

  if (resp) bot.sendMessage(chatId, resp)
})

// bot.on('message', msg => {
//   const chatId = msg.chat.id
//
//   bot.sendMessage(chatId, 'Привет. Я разрабатываюсь')
// })

enum BotAction {
  GOT = 'got',
}

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id

  bot.sendMessage(chatId, `Протекстируй кнопку`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Тыкай',
            callback_data: BotAction.GOT,
          },
        ],
      ],
    },
  })
})

bot.on('callback_query', callbackQuery => {
  const action = callbackQuery.data
  const msg = callbackQuery.message
  if (!msg) return

  if (action === BotAction.GOT) {
    bot.sendMessage(msg.chat.id, 'Работает!!!')
  }
})

startServer()
