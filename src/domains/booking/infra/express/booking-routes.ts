import { Router } from 'express'

import {
  makeHttpCreateBookingController,
  makeHttpDeleteBookingByIdController,
  makeHttpGetBookingByIdController,
  makeHttpGetBookingsByFilterController,
  makeHttpUpdateBookingByIdController,
} from '@/domains/booking/factories'
import { adaptRoute } from '@/shared/infra/express/adapters'
import { authMiddleware } from '@/main/infra/express/middlewares'

const bookingRouter = Router()

bookingRouter
  .route('/bookings')
  .post(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpCreateBookingController()),
  )
  .get(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpGetBookingsByFilterController()),
  )

bookingRouter
  .route('/bookings/:id')
  .get(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpGetBookingByIdController()),
  )
  .patch(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpUpdateBookingByIdController()),
  )
  .delete(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpDeleteBookingByIdController()),
  )

export { bookingRouter }
