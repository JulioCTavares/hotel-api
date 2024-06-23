import { Booking } from '@/domains/booking/entities'
import { BookingDefaultPresenter } from '@/domains/booking/interface/presenters'

export class BookingTransformers {
  static generateDefaultPresenter(booking: Booking): BookingDefaultPresenter {
    return {
      id: booking.id,
      roomNumber: booking.roomNumber,
      bookingAmount: booking.bookingAmount,
      bookingDate: booking.bookingDate,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      created_at: booking.createdAt,
      updated_at: booking.updatedAt,
    }
  }
}
