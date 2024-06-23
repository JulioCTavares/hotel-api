import { PrismaClient } from '@prisma/client'

import { ICountBookingsByFilterRepository } from '@/domains/booking/usecases/repos'

import { PrismaFormatter, PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaCountBookingsByFilterRepository
  implements ICountBookingsByFilterRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async count(
    filters: ICountBookingsByFilterRepository.Params,
  ): Promise<ICountBookingsByFilterRepository.Result> {
    try {
      const filtersFormated = PrismaFormatter.formatFilter(filters)

      const totalBookings = await this.prismaConnection.booking.count({
        where: filtersFormated,
      })

      return totalBookings
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
