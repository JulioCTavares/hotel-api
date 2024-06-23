import { Booking } from '@/domains/booking/entities'

export interface IGetBookingByIdRepository {
  get(
    id: IGetBookingByIdRepository.Params,
  ): Promise<IGetBookingByIdRepository.Result>
}

export namespace IGetBookingByIdRepository {
  export type Params = string
  export type Result = Booking | null
}
