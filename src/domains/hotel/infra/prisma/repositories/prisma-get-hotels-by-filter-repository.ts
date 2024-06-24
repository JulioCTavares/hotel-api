import { Hotel as HotelModel, PrismaClient } from '@prisma/client'

import { IGetHotelsByFilterRepository } from '@/domains/hotel/usecases/repos'
import { Hotel } from '@/domains/hotel/entities'

import { PrismaFormatter, PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaHotelMapper } from '../mapper'

export class PrismaGetHotelsByFilterRepository
  implements IGetHotelsByFilterRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    filter: IGetHotelsByFilterRepository.Params,
  ): Promise<IGetHotelsByFilterRepository.Result> {
    try {
      const { orderBy, pagination, filters } = filter

      const filtersFormated = PrismaFormatter.formatFilter(filters)

      const hotels = await this.prismaConnection.hotel.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      })

      return hotels.map((hotel) => {
        return PrismaHotelMapper.toDomain(hotel)
      })
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
