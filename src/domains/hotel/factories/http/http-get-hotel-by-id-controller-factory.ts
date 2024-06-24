import {
  PrismaGetHotelByIdRepository,
} from '@/domains/hotel/infra/prisma/repositories';
import {
  makeGetHotelByIdValidation,
} from '@/domains/hotel/interface/validation';
import {
  HttpGetHotelByIdController,
} from '@/domains/hotel/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetHotelByIdController = (): HttpGetHotelByIdController => {
  const getHotelByIdRepository = new PrismaGetHotelByIdRepository();
  const validation = makeGetHotelByIdValidation();
  const logger = pinoLoggerLocal;

  return new HttpGetHotelByIdController(
    getHotelByIdRepository,
    validation,
    logger,
  );
};
