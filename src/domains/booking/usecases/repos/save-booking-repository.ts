import { Booking } from '@/domains/booking/entities';

export interface ISaveBookingRepository {
  save(
    bookingParams: ISaveBookingRepository.Params,
  ): Promise<ISaveBookingRepository.Result>;
}

export namespace ISaveBookingRepository {
  export type Params = Booking;
  export type Result = Booking;
}
