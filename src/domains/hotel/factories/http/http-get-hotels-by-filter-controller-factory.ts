import {
  PrismaGetHotelsByFilterRepository,
  PrismaCountHotelsByFilterRepository,
} from '@/domains/hotel/infra/prisma/repositories'
import { HttpGetHotelsByFilterController } from '@/domains/hotel/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetHotelsByFilterController =
  (): HttpGetHotelsByFilterController => {
    const getHotelsByFilterRepository = new PrismaGetHotelsByFilterRepository()
    const countHotelsByFilterRepository =
      new PrismaCountHotelsByFilterRepository()
    const logger = pinoLoggerLocal

    return new HttpGetHotelsByFilterController(
      getHotelsByFilterRepository,
      countHotelsByFilterRepository,
      logger,
    )
  }
