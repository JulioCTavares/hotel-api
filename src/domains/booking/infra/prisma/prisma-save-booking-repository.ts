import { PrismaClient } from '@prisma/client'

import { ISaveBookingRepository } from '@/domains/booking/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { PrismaBookingMapper } from './mappers/prisma-booking-mapper'
import { prismaConnector } from '@/main/infra/prisma'

export class PrismaSaveBookingRepository implements ISaveBookingRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async save(
    bookingParams: ISaveBookingRepository.Params,
  ): Promise<ISaveBookingRepository.Result> {
    try {
      const bookingCreated = await this.prismaConnection.booking.create({
        data: bookingParams,
      })

      return PrismaBookingMapper.toDomain(bookingCreated)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
