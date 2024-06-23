import { IUpdateBookingRepository } from '@/domains/booking/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaBookingMapper } from './mappers/prisma-booking-mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaUpdateBookingRepository implements IUpdateBookingRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async update(
    bookingToUpdate: IUpdateBookingRepository.Params,
  ): Promise<IUpdateBookingRepository.Result> {
    try {
      const { id, ...restOfBookingParams } = bookingToUpdate

      const booking = await this.prismaConnection.booking.update({
        where: { id },
        data: restOfBookingParams,
      })

      return PrismaBookingMapper.toDomain(booking)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
