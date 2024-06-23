import { Router } from 'express'

import {
  makeHttpCreateBookingController,
  makeHttpDeleteBookingByIdController,
  makeHttpGetBookingByIdController,
  makeHttpGetBookingsByFilterController,
  makeHttpUpdateBookingByIdController,
} from '@/domains/booking/factories'
import { adaptRoute } from '@/shared/infra/express/adapters'

const bookingRouter = Router()

bookingRouter
  .route('/bookings')
  .post(adaptRoute(makeHttpCreateBookingController()))
  .get(adaptRoute(makeHttpGetBookingsByFilterController()))

bookingRouter
  .route('/bookings/:id')
  .get(adaptRoute(makeHttpGetBookingByIdController()))
  .patch(adaptRoute(makeHttpUpdateBookingByIdController()))
  .delete(adaptRoute(makeHttpDeleteBookingByIdController()))

export { bookingRouter }
