import {
  PrismaGetHotelByIdRepository,
  PrismaUpdateHotelRepository,
} from '@/domains/hotel/infra/prisma/repositories'
import { HttpUpdateHotelByIdController } from '@/domains/hotel/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpUpdateHotelByIdController =
  (): HttpUpdateHotelByIdController => {
    const getHotelByIdRepository = new PrismaGetHotelByIdRepository()
    const updateHotelByIdRepository = new PrismaUpdateHotelRepository()

    const logger = pinoLoggerLocal

    return new HttpUpdateHotelByIdController(
      getHotelByIdRepository,
      updateHotelByIdRepository,
      logger,
    )
  }
