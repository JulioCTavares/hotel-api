import { adaptRoute } from '@/shared/infra/express/adapters'

import { Router } from 'express'

import { authMiddleware } from '@/main/infra/express/middlewares'

import {
  makeHttpCreateHotelController,
  makeHttpDeleteHotelByIdController,
  makeHttpGetHotelByIdController,
  makeHttpGetHotelsByFilterController,
  makeHttpUpdateHotelByIdController,
} from '@/domains/hotel/factories/http'

const hotelRouter = Router()

hotelRouter
  .route('/hotels')
  .post(authMiddleware(['ADMIN']), adaptRoute(makeHttpCreateHotelController()))
  .get(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpGetHotelsByFilterController()),
  )

hotelRouter
  .route('/hotels/:id')
  .get(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpGetHotelByIdController()),
  )
  .patch(
    authMiddleware(['ADMIN']),
    adaptRoute(makeHttpUpdateHotelByIdController()),
  )
  .delete(
    authMiddleware(['ADMIN']),
    adaptRoute(makeHttpDeleteHotelByIdController()),
  )

export { hotelRouter }
