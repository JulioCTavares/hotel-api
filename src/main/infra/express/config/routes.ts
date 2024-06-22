import { Express, Router } from 'express'
import { errorMiddleware, responseMiddleware } from '../middlewares'
import { healthCheckRouter } from '../routes/health-check-routes'
import { userRouter } from '@/domains/user/infra/express/user-routes'

export default (app: Express): void => {
  const router = Router()

  router.use(healthCheckRouter)
  router.use(userRouter)

  app.use(router)
  app.use(responseMiddleware)
  app.use(errorMiddleware)
}
