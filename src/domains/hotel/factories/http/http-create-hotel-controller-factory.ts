import {
  PrismaGetHotelByNameRepository,
  PrismaSaveHotelRepository,
} from '@/domains/hotel/infra/prisma/repositories';
import {
  makeCreateHotelValidation,
} from '@/domains/hotel/interface/validation';
import {
  HttpCreateHotelController,
} from '@/domains/hotel/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';
import { UUIDGeneratorAdapter } from '@/shared/infra/uuid';

export const makeHttpCreateHotelController = (): HttpCreateHotelController => {
  const getHotelByNameRepository = new PrismaGetHotelByNameRepository();
  const saveHotelRepository = new PrismaSaveHotelRepository();

  const uuidGenerator = new UUIDGeneratorAdapter();
  const validation = makeCreateHotelValidation();
  const logger = pinoLoggerLocal;

  return new HttpCreateHotelController(
      getHotelByNameRepository,
      saveHotelRepository,
      uuidGenerator,
      validation,
      logger
  );
};
