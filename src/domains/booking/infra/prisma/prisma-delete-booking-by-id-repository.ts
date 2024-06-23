import { PrismaClient } from '@prisma/client'

import { IDeleteBookingByIdRepository } from '@/domains/booking/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaDeleteBookingByIdRepository
  implements IDeleteBookingByIdRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async delete(
    id: IDeleteBookingByIdRepository.Params,
  ): Promise<IDeleteBookingByIdRepository.Result> {
    try {
      await this.prismaConnection.booking.delete({
        where: { id },
      })
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
