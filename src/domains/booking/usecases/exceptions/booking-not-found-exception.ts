import { DefaultException, ExceptionTypes } from '@/shared/helpers/error-helper'

import { Booking } from '@/domains/booking/entities'

export class BookingNotFoundException extends DefaultException {
  constructor(booking: Partial<Booking>) {
    super({
      type: ExceptionTypes.USER,
      code: 'BOOKING_NOT_FOUND',
      data: booking,
    })
  }
}
