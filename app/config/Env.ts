import { config } from 'dotenv'

config()

const serverUrl = process.env.SERVER_URL
const botToken = process.env.BOT_TOKEN
const dbPassword = process.env.DB_PASSWORD

if (!botToken) throw new Error("Fill the bot's token in .env like in .env.example")
if (!serverUrl) throw new Error('Fill the SERVER_URL in .env like in .env.example')
if (!dbPassword) throw new Error('Fill the DB_PASSWORD in .env like in .env.example')

export const Env = {
  serverUrl,
  botToken,
  dbPassword,
}
