import { Hotel } from '@/domains/hotel/entities';

export interface ISaveHotelRepository {
  save(
    hotelParams: ISaveHotelRepository.Params,
  ): Promise<ISaveHotelRepository.Result>;
}

export namespace ISaveHotelRepository {
  export type Params = Hotel;
  export type Result = Hotel;
}
