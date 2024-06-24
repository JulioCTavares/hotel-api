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
  .post(authMiddleware(), adaptRoute(makeHttpCreateHotelController()))
  .get(authMiddleware(), adaptRoute(makeHttpGetHotelsByFilterController()))

hotelRouter
  .route('/hotels/:id')
  .get(authMiddleware(), adaptRoute(makeHttpGetHotelByIdController()))
  .patch(authMiddleware(), adaptRoute(makeHttpUpdateHotelByIdController()))
  .delete(authMiddleware(), adaptRoute(makeHttpDeleteHotelByIdController()))

export { hotelRouter }
