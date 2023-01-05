import { config } from 'dotenv'
import Fastify from 'fastify'
import TelegramBot from 'node-telegram-bot-api'

config()

if (!process.env.BOT_TOKEN) throw new Error("Fill the bot's token in .env like in .env.example")
if (!process.env.SERVER_URL) throw new Error('Fill the SERVER_URL in .env like in .env.example')

const serverUrl = process.env.SERVER_URL
const token = process.env.BOT_TOKEN

const fastify = Fastify({
  logger: true,
})

const bot = new TelegramBot(token, { polling: true })

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

fastify.get('/', (_request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 4243 }, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  } else {
    bot.setWebHook(serverUrl)
  }
})

bot.on('callback_query', callbackQuery => {
  const action = callbackQuery.data
  const msg = callbackQuery.message
  if (!msg) return

  if (action === BotAction.GOT) {
    bot.sendMessage(msg.chat.id, 'Работает!!!')
  }
})
