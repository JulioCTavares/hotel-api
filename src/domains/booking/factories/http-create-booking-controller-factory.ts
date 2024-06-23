import { PrismaSaveBookingRepository } from '@/domains/booking/infra/prisma'
import { HttpCreateBookingController } from '@/domains/booking/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

import { UUIDGeneratorAdapter } from '@/shared/infra/uuid'

export const makeHttpCreateBookingController =
  (): HttpCreateBookingController => {
    const saveBookingRepository = new PrismaSaveBookingRepository()

    const uuidGenerator = new UUIDGeneratorAdapter()
    const logger = pinoLoggerLocal

    return new HttpCreateBookingController(
      saveBookingRepository,
      uuidGenerator,
      logger,
    )
  }
