import { Router } from 'express'

import { makeHttpCreateBookingController } from '@/domains/booking/factories'
import { adaptRoute } from '@/shared/infra/express/adapters'

const bookingRouter = Router()

bookingRouter
  .route('/bookings')
  .post(adaptRoute(makeHttpCreateBookingController()))

export { bookingRouter }
