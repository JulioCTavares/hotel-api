import { IGetBookingByIdRepository } from '@/domains/booking/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaBookingMapper } from './mappers/prisma-booking-mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaGetBookingByIdRepository
  implements IGetBookingByIdRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    id: IGetBookingByIdRepository.Params,
  ): Promise<IGetBookingByIdRepository.Result> {
    try {
      const booking = await this.prismaConnection.booking.findFirst({
        where: { id },
      })

      if (!booking) {
        return null
      }

      return PrismaBookingMapper.toDomain(booking)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
