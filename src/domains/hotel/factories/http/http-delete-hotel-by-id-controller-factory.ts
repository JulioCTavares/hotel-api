import {
  PrismaDeleteHotelByIdRepository,
  PrismaGetHotelByIdRepository,
} from '@/domains/hotel/infra/prisma/repositories';
import {
  makeDeleteHotelByIdValidation,
} from '@/domains/hotel/interface/validation';
import {
  HttpDeleteHotelByIdController,
} from '@/domains/hotel/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpDeleteHotelByIdController =
  (): HttpDeleteHotelByIdController => {
    const getHotelByIdRepository = new PrismaGetHotelByIdRepository();
    const deleteHotelByIdRepository = new PrismaDeleteHotelByIdRepository();

    const validation = makeDeleteHotelByIdValidation();
    const logger = pinoLoggerLocal;

    return new HttpDeleteHotelByIdController(
      getHotelByIdRepository,
      deleteHotelByIdRepository,
      validation,
      logger,
    );
  };
