import { BookingFilters } from '@/domains/booking/usecases';
import { Booking } from '@/domains/booking/entities';

export interface IGetBookingsByFilterRepository {
  get(
    params: IGetBookingsByFilterRepository.Params,
  ): Promise<IGetBookingsByFilterRepository.Result>;
}

export namespace IGetBookingsByFilterRepository {
  export type Params = BookingFilters;
  export type Result = Array<Booking>;
}
