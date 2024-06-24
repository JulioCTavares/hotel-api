import { Express, Router } from 'express'
import { errorMiddleware, responseMiddleware } from '../middlewares'
import { healthCheckRouter } from '../routes/health-check-routes'
import { userRouter } from '@/domains/user/infra/express/user-routes'
import { bookingRouter } from '@/domains/booking/infra/express'
import { authRouter } from '@/domains/auth/infra/express'
import { hotelRouter } from '@/domains/hotel/infra/express'

export default (app: Express): void => {
  const router = Router()

  router.use(healthCheckRouter)
  router.use(userRouter)
  router.use(bookingRouter)
  router.use(authRouter)
  router.use(hotelRouter)

  app.use(router)
  app.use(responseMiddleware)
  app.use(errorMiddleware)
}
