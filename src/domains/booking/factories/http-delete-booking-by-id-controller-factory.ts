import {
  PrismaDeleteBookingByIdRepository,
  PrismaGetBookingByIdRepository,
} from '@/domains/booking/infra/prisma'
import { HttpDeleteBookingByIdController } from '@/domains/booking/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpDeleteBookingByIdController =
  (): HttpDeleteBookingByIdController => {
    const getBookingByIdRepository = new PrismaGetBookingByIdRepository()
    const deleteBookingByIdRepository = new PrismaDeleteBookingByIdRepository()

    const logger = pinoLoggerLocal

    return new HttpDeleteBookingByIdController(
      getBookingByIdRepository,
      deleteBookingByIdRepository,
      logger,
    )
  }
