export interface IDeleteUserByIdRepository {
  delete(
    id: IDeleteUserByIdRepository.Params,
  ): Promise<IDeleteUserByIdRepository.Result>
}

export namespace IDeleteUserByIdRepository {
  export type Params = string
  export type Result = void
}
