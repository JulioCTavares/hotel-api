import {
  PrismaGetHotelByNameRepository,
  PrismaGetHotelByIdRepository,
  PrismaUpdateHotelRepository,
} from '@/domains/hotel/infra/prisma/repositories';
import {
  makeUpdateHotelValidation,
} from '@/domains/hotel/interface/validation';
import {
  HttpUpdateHotelByIdController,
} from '@/domains/hotel/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpUpdateHotelByIdController =
  (): HttpUpdateHotelByIdController => {
    const getHotelByIdRepository = new PrismaGetHotelByIdRepository();
    const getHotelByNameRepository = new PrismaGetHotelByNameRepository();
    const updateHotelByIdRepository = new PrismaUpdateHotelRepository();

    const validation = makeUpdateHotelValidation();
    const logger = pinoLoggerLocal;

    return new HttpUpdateHotelByIdController(
      getHotelByIdRepository,
      getHotelByNameRepository,
      updateHotelByIdRepository,
      validation,
      logger,
    );
  };
