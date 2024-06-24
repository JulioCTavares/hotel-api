import { HotelFilters } from '@/domains/hotel/usecases';

export interface ICountHotelsByFilterRepository {
  count(
    filters: ICountHotelsByFilterRepository.Params,
  ): Promise<ICountHotelsByFilterRepository.Result>;
}

export namespace ICountHotelsByFilterRepository {
  export type Params = HotelFilters['filters'];
  export type Result = number;
}
