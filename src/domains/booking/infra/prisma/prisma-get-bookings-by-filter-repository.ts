import { IGetBookingsByFilterRepository } from '@/domains/booking/usecases/repos'

import { PrismaFormatter, PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaBookingMapper } from './mappers/prisma-booking-mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaGetBookingsByFilterRepository
  implements IGetBookingsByFilterRepository
{
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    filter: IGetBookingsByFilterRepository.Params,
  ): Promise<IGetBookingsByFilterRepository.Result> {
    try {
      const { orderBy, pagination, filters } = filter

      const filtersFormated = PrismaFormatter.formatFilter(filters)

      const bookingDTOs = await this.prismaConnection.booking.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      })

      const bookings = bookingDTOs.map((bookingDTO) => {
        return PrismaBookingMapper.toDomain(bookingDTO)
      })

      return bookings
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
