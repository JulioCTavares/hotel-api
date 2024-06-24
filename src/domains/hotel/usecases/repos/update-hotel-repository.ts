import { Hotel } from '@/domains/hotel/entities';

export interface IUpdateHotelRepository {
  update(
    hotelToUpdate: IUpdateHotelRepository.Params,
  ): Promise<IUpdateHotelRepository.Result>;
}

export namespace IUpdateHotelRepository {
  export type Params = Hotel;
  export type Result = Hotel;
}
