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
  .post(authMiddleware(), adaptRoute(makeHttpCreateBookingController()))
  .get(authMiddleware(), adaptRoute(makeHttpGetBookingsByFilterController()))

bookingRouter
  .route('/bookings/:id')
  .get(authMiddleware(), adaptRoute(makeHttpGetBookingByIdController()))
  .patch(authMiddleware(), adaptRoute(makeHttpUpdateBookingByIdController()))
  .delete(authMiddleware(), adaptRoute(makeHttpDeleteBookingByIdController()))

export { bookingRouter }
