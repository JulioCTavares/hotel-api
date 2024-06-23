import { BookingFilters } from '@/domains/booking/usecases'

export interface ICountBookingsByFilterRepository {
  count(
    filters: ICountBookingsByFilterRepository.Params,
  ): Promise<ICountBookingsByFilterRepository.Result>
}

export namespace ICountBookingsByFilterRepository {
  export type Params = BookingFilters['filters']
  export type Result = number
}
