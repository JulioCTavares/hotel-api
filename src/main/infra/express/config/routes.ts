import { Express, Router } from 'express'
import { errorMiddleware, responseMiddleware } from '../middlewares'
import { healthCheckRouter } from '../routes/health-check-routes'

export default (app: Express): void => {
  const router = Router()

  router.use(healthCheckRouter)

  app.use(router)
  app.use(responseMiddleware)
  app.use(errorMiddleware)
}
