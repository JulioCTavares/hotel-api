import { ISaveHotelRepository } from '@/domains/hotel/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaHotelMapper } from '../mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaSaveHotelRepository implements ISaveHotelRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async save(
    hotelParams: ISaveHotelRepository.Params,
  ): Promise<ISaveHotelRepository.Result> {
    try {
      const { ...restHotelParams } = hotelParams

      const hotel = await this.prismaConnection.hotel.create({
        data: restHotelParams,
      })

      return PrismaHotelMapper.toDomain(hotel)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
