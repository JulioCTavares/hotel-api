import { IGetHotelByNameRepository } from '@/domains/hotel/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { PrismaHotelMapper } from '../mapper'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaClient } from '@prisma/client'

export class PrismaGetHotelByNameRepository
  implements IGetHotelByNameRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    name: IGetHotelByNameRepository.Params,
  ): Promise<IGetHotelByNameRepository.Result> {
    try {
      const hotel = await this.prismaConnection.hotel.findFirst({
        where: { name },
      })

      if (!hotel) {
        return null
      }

      return PrismaHotelMapper.toDomain(hotel)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
