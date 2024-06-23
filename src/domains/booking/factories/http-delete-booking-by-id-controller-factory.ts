import {
  PrismaDeleteBookingByIdRepository,
  PrismaGetBookingByIdRepository,
} from '@/domains/booking/infra/prisma'
import { makeDeleteBookingByIdValidation } from '@/domains/booking/interface/validation'
import { HttpDeleteBookingByIdController } from '@/domains/booking/interface/http'

import { pinoLoggerLocal } from '@/shared/infra/logs'

export const makeHttpDeleteBookingByIdController =
  (): HttpDeleteBookingByIdController => {
    const getBookingByIdRepository = new PrismaGetBookingByIdRepository()
    const deleteBookingByIdRepository = new PrismaDeleteBookingByIdRepository()

    const validation = makeDeleteBookingByIdValidation()
    const logger = pinoLoggerLocal

    return new HttpDeleteBookingByIdController(
      getBookingByIdRepository,
      deleteBookingByIdRepository,
      validation,
      logger,
    )
  }
