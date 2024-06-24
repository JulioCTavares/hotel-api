import { Hotel as HotelModel, PrismaClient } from '@prisma/client'

import { IGetHotelByIdRepository } from '@/domains/hotel/usecases/repos'
import { Hotel } from '@/domains/hotel/entities'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaHotelMapper } from '../mapper'

export class PrismaGetHotelByIdRepository implements IGetHotelByIdRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    id: IGetHotelByIdRepository.Params,
  ): Promise<IGetHotelByIdRepository.Result> {
    try {
      const hotel = await this.prismaConnection.hotel.findFirst({
        where: { id },
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
