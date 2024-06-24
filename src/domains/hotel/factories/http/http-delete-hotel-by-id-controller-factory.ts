import {
  PrismaDeleteHotelByIdRepository,
  PrismaGetHotelByIdRepository,
} from '@/domains/hotel/infra/prisma/repositories'
import { HttpDeleteHotelByIdController } from '@/domains/hotel/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpDeleteHotelByIdController =
  (): HttpDeleteHotelByIdController => {
    const getHotelByIdRepository = new PrismaGetHotelByIdRepository()
    const deleteHotelByIdRepository = new PrismaDeleteHotelByIdRepository()

    const logger = pinoLoggerLocal

    return new HttpDeleteHotelByIdController(
      getHotelByIdRepository,
      deleteHotelByIdRepository,
      logger,
    )
  }
