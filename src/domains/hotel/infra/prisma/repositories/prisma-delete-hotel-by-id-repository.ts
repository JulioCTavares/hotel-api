import { PrismaClient } from '@prisma/client'

import { IDeleteHotelByIdRepository } from '@/domains/hotel/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaDeleteHotelByIdRepository
  implements IDeleteHotelByIdRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async delete(
    id: IDeleteHotelByIdRepository.Params,
  ): Promise<IDeleteHotelByIdRepository.Result> {
    try {
      await this.prismaConnection.hotel.delete({
        where: { id },
      })
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
