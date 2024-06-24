import { Hotel } from '@/domains/hotel/entities';

export interface IGetHotelByIdRepository {
  get(
    id: IGetHotelByIdRepository.Params,
  ): Promise<IGetHotelByIdRepository.Result>;
}

export namespace IGetHotelByIdRepository {
  export type Params = string;
  export type Result = Hotel | null;
}
