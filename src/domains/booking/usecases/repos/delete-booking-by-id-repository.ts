export interface IDeleteBookingByIdRepository {
  delete(
    id: IDeleteBookingByIdRepository.Params,
  ): Promise<IDeleteBookingByIdRepository.Result>
}

export namespace IDeleteBookingByIdRepository {
  export type Params = string
  export type Result = void
}
