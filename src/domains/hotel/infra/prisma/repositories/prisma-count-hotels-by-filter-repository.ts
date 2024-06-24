import { PrismaClient } from '@prisma/client'

import { ICountHotelsByFilterRepository } from '@/domains/hotel/usecases/repos'

import { PrismaFormatter, PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaCountHotelsByFilterRepository
  implements ICountHotelsByFilterRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async count(
    filters: ICountHotelsByFilterRepository.Params,
  ): Promise<ICountHotelsByFilterRepository.Result> {
    try {
      const filtersFormated = PrismaFormatter.formatFilter(filters)

      const totalHotels = await this.prismaConnection.hotel.count({
        where: filtersFormated,
      })

      return totalHotels
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
