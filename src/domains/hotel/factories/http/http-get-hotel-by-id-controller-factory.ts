import { PrismaGetHotelByIdRepository } from '@/domains/hotel/infra/prisma/repositories'
import { HttpGetHotelByIdController } from '@/domains/hotel/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetHotelByIdController =
  (): HttpGetHotelByIdController => {
    const getHotelByIdRepository = new PrismaGetHotelByIdRepository()
    const logger = pinoLoggerLocal

    return new HttpGetHotelByIdController(getHotelByIdRepository, logger)
  }
