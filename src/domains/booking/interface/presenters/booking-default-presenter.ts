import { BookingStatus } from '@/domains/booking/entities'

export interface BookingDefaultPresenter {
  id: string
  roomNumber: string
  bookingAmount: boolean
  bookingDate: Date
  startDate: Date
  endDate: Date
  status: BookingStatus
  created_at?: Date
  updated_at?: Date
}
