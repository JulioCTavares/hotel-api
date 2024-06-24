import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import { authMiddleware } from '@/main/infra/express/middlewares';

import {
  makeHttpCreateHotelController,
  makeHttpDeleteHotelByIdController,
  makeHttpGetHotelByIdController,
  makeHttpGetHotelsByFilterController,
  makeHttpUpdateHotelByIdController,
} from '@/domains/hotel/factories/http';

const hotelRouter = Router();

hotelRouter
  .route('/hotels')
  .post(authMiddleware('USER'), adaptRoute(makeHttpCreateHotelController()))
  .get(
    authMiddleware('USER'),
    adaptRoute(makeHttpGetHotelsByFilterController())
  );

hotelRouter
  .route('/hotels/:id')
  .get(authMiddleware('USER'), adaptRoute(makeHttpGetHotelByIdController()))
  .patch(
    authMiddleware('USER'),
    adaptRoute(makeHttpUpdateHotelByIdController())
  )
  .delete(
    authMiddleware('USER'),
    adaptRoute(makeHttpDeleteHotelByIdController())
  );

export { hotelRouter };
