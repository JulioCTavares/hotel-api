import {
  PrismaGetBookingsByFilterRepository,
  PrismaCountBookingsByFilterRepository,
} from '@/domains/booking/infra/prisma'
import { HttpGetBookingsByFilterController } from '@/domains/booking/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetBookingsByFilterController =
  (): HttpGetBookingsByFilterController => {
    const getBookingsByFilterRepository =
      new PrismaGetBookingsByFilterRepository()
    const countBookingsByFilterRepository =
      new PrismaCountBookingsByFilterRepository()
    const logger = pinoLoggerLocal

    return new HttpGetBookingsByFilterController(
      getBookingsByFilterRepository,
      countBookingsByFilterRepository,
      logger,
    )
  }
