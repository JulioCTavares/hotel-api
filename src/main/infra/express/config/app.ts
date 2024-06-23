import express from 'express'

import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import { env } from '@/config'

const app = express()

;(async () => {
  if (env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test') {
    await (async () => {
      ;(await import('./swagger.js')).default(app)
    })()
  }

  setupMiddlewares(app)
  setupRoutes(app)
})()

export default app
