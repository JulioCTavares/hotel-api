import { Booking, BookingStatus } from '@/domains/booking/entities'

import { Booking as PrismaBooking } from '@prisma/client'

export class PrismaBookingMapper {
  static toDomain(bookingDTO: PrismaBooking): Booking {
    return new Booking({
      id: bookingDTO.id,
      roomNumber: bookingDTO.roomNumber,
      bookingAmount: bookingDTO.bookingAmount,
      bookingDate: bookingDTO.bookingDate,
      startDate: bookingDTO.startDate,
      endDate: bookingDTO.endDate,
      status: bookingDTO.status as BookingStatus,
      createdAt: bookingDTO.createdAt,
      updatedAt: bookingDTO.updatedAt,
    })
  }
}
