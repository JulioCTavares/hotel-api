import { HotelFilters } from '@/domains/hotel/usecases';
import { Hotel } from '@/domains/hotel/entities';

export interface IGetHotelsByFilterRepository {
  get(
    params: IGetHotelsByFilterRepository.Params,
  ): Promise<IGetHotelsByFilterRepository.Result>;
}

export namespace IGetHotelsByFilterRepository {
  export type Params = HotelFilters;
  export type Result = Array<Hotel>;
}
