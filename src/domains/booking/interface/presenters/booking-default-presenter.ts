import { BookingStatus } from '@/domains/booking/entities'

export interface BookingDefaultPresenter {
  id: string
  roomNumber: number
  bookingAmount: number
  bookingDate: Date
  startDate: Date
  endDate: Date
  status: BookingStatus
  created_at?: Date
  updated_at?: Date
}
