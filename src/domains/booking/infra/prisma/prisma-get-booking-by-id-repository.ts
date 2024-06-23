import { Booking as BookingModel, PrismaClient } from '@prisma/client'

import { IGetBookingByIdRepository } from '@/domains/booking/usecases/repos'
import { Booking } from '@/domains/booking/entities'

import { convertNullToUndefined } from '@/shared/helpers'
import { prismaConnector, PrismaException } from '@/shared/infra/prisma'

export class PrismaGetBookingByIdRepository
  implements IGetBookingByIdRepository
{
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    id: IGetBookingByIdRepository.Params,
  ): Promise<IGetBookingByIdRepository.Result> {
    try {
      const bookingDTO = await this.prismaConnection.booking.findFirst({
        where: { id, enabled: true },
      })

      if (!bookingDTO) {
        return null
      }

      const booking = new Booking(
        convertNullToUndefined<BookingModel>(bookingDTO),
      )

      return booking
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
