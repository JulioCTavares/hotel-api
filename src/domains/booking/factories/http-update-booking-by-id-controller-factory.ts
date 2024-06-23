import {
  PrismaGetBookingByIdRepository,
  PrismaUpdateBookingRepository,
} from '@/domains/booking/infra/prisma'
import { HttpUpdateBookingByIdController } from '@/domains/booking/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpUpdateBookingByIdController =
  (): HttpUpdateBookingByIdController => {
    const getBookingByIdRepository = new PrismaGetBookingByIdRepository()
    const updateBookingByIdRepository = new PrismaUpdateBookingRepository()

    const logger = pinoLoggerLocal

    return new HttpUpdateBookingByIdController(
      getBookingByIdRepository,
      updateBookingByIdRepository,
      logger,
    )
  }
