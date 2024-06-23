import {
  PrismaGetBookingByNameRepository,
  PrismaSaveBookingRepository,
} from '@/domains/booking/infra/prisma';
import {
  makeCreateBookingValidation,
} from '@/domains/booking/interface/validation';
import {
  HttpCreateBookingController,
} from '@/domains/booking/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';
import { UUIDGeneratorAdapter } from '@/shared/infra/uuid';

export const makeHttpCreateBookingController = (): HttpCreateBookingController => {
  const getBookingByNameRepository = new PrismaGetBookingByNameRepository();
  const saveBookingRepository = new PrismaSaveBookingRepository();

  const uuidGenerator = new UUIDGeneratorAdapter();
  const validation = makeCreateBookingValidation();
  const logger = pinoLoggerLocal;

  return new HttpCreateBookingController(
    getBookingByNameRepository,
    saveBookingRepository,
    uuidGenerator,
    validation,
    logger
  );
};
