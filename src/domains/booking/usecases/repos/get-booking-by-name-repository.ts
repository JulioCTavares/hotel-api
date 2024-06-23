import { Booking } from '@/domains/booking/entities'

export interface IGetBookingByNameRepository {
  get(
    name: IGetBookingByNameRepository.Params,
  ): Promise<IGetBookingByNameRepository.Result>
}

export namespace IGetBookingByNameRepository {
  export type Params = string
  export type Result = Booking | null
}
