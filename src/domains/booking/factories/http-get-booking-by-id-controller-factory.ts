import { PrismaGetBookingByIdRepository } from '@/domains/booking/infra/prisma'
import { HttpGetBookingByIdController } from '@/domains/booking/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetBookingByIdController =
  (): HttpGetBookingByIdController => {
    const getBookingByIdRepository = new PrismaGetBookingByIdRepository()
    const logger = pinoLoggerLocal

    return new HttpGetBookingByIdController(getBookingByIdRepository, logger)
  }
