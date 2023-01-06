import TelegramBot from 'node-telegram-bot-api'
import { Env } from '../config/Env'

export const bot = new TelegramBot(Env.botToken, { polling: true })
