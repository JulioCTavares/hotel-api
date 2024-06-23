import { Booking } from '@/domains/booking/entities'

export interface IUpdateBookingRepository {
  update(
    bookingToUpdate: IUpdateBookingRepository.Params,
  ): Promise<IUpdateBookingRepository.Result>
}

export namespace IUpdateBookingRepository {
  export type Params = Booking
  export type Result = Booking
}
