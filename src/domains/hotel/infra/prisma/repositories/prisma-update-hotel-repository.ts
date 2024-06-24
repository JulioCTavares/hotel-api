import { PrismaClient } from '@prisma/client'

import { IUpdateHotelRepository } from '@/domains/hotel/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { PrismaHotelMapper } from '../mapper'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaUpdateHotelRepository implements IUpdateHotelRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async update(
    hotelToUpdate: IUpdateHotelRepository.Params,
  ): Promise<IUpdateHotelRepository.Result> {
    try {
      const { id, ...restOfHotelParams } = hotelToUpdate

      const hotel = await this.prismaConnection.hotel.update({
        where: { id },
        data: restOfHotelParams,
      })

      return PrismaHotelMapper.toDomain(hotel)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
