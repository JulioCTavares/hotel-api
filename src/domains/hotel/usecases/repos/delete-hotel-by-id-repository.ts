export interface IDeleteHotelByIdRepository {
  delete(
    id: IDeleteHotelByIdRepository.Params,
  ): Promise<IDeleteHotelByIdRepository.Result>;
}

export namespace IDeleteHotelByIdRepository {
  export type Params = string;
  export type Result = void;
}
