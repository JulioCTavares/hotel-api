export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
}

export type BookingConstructorParams = {
  id: string
  roomNumber: number
  bookingAmount: number
  bookingDate: Date
  startDate: Date
  endDate: Date
  status: BookingStatus
  userId: string
  createdAt?: Date
  updatedAt?: Date
}

export class Booking {
  id: string
  roomNumber: number
  bookingAmount: number
  bookingDate: Date
  startDate: Date
  endDate: Date
  userId: string
  status: BookingStatus
  createdAt?: Date
  updatedAt?: Date

  constructor(bookingParams: BookingConstructorParams) {
    const {
      id,
      roomNumber,
      bookingAmount,
      bookingDate,
      startDate,
      endDate,
      status,
      userId,
      createdAt,
      updatedAt,
    } = bookingParams

    this.id = id
    this.roomNumber = roomNumber
    this.bookingAmount = bookingAmount
    this.bookingDate = bookingDate
    this.startDate = startDate
    this.endDate = endDate
    this.status = status
    this.userId = userId
    this.createdAt = createdAt
    this.updatedAt = updatedAt

    Object.freeze(this)
  }
}
