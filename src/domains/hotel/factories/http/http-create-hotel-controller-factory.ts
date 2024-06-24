import { PrismaSaveHotelRepository } from '@/domains/hotel/infra/prisma/repositories'
import { HttpCreateHotelController } from '@/domains/hotel/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

import { UUIDGeneratorAdapter } from '@/shared/infra/uuid'

export const makeHttpCreateHotelController = (): HttpCreateHotelController => {
  const saveHotelRepository = new PrismaSaveHotelRepository()

  const uuidGenerator = new UUIDGeneratorAdapter()
  const logger = pinoLoggerLocal

  return new HttpCreateHotelController(
    saveHotelRepository,
    uuidGenerator,
    logger,
  )
}
