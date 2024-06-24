import {
  PrismaGetHotelsByFilterRepository,
  PrismaCountHotelsByFilterRepository,
} from '@/domains/hotel/infra/prisma/repositories';
import {
  makeGetHotelsByFilterValidation,
} from '@/domains/hotel/interface/validation';
import {
  HttpGetHotelsByFilterController,
} from '@/domains/hotel/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetHotelsByFilterController =
  (): HttpGetHotelsByFilterController => {
    const getHotelsByFilterRepository = new PrismaGetHotelsByFilterRepository();
    const countHotelsByFilterRepository = new PrismaCountHotelsByFilterRepository();
    const validation = makeGetHotelsByFilterValidation();
    const logger = pinoLoggerLocal;

    return new HttpGetHotelsByFilterController(
      getHotelsByFilterRepository,
      countHotelsByFilterRepository,
      validation,
      logger,
    );
  };
