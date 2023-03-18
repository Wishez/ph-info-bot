import log4js from 'log4js'
import 'reflect-metadata'
import { useBot } from './bot'
import { startServer } from './server'

log4js.configure({
  appenders: {
    eventError: { type: 'file', filename: 'events-errors.log' },
    graphql: { type: 'file', filename: 'graphql.log' },
  },
  categories: {
    default: { appenders: ['eventError'], level: 'error' },
    graphql: { appenders: ['graphql'], level: 'trace' },
  },
})

useBot()
startServer()
