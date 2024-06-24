import { Hotel } from '@/domains/hotel/entities';

export interface IGetHotelByNameRepository {
  get(
    name: IGetHotelByNameRepository.Params,
  ): Promise<IGetHotelByNameRepository.Result>;
}

export namespace IGetHotelByNameRepository {
  export type Params = string;
  export type Result = Hotel | null;
}
