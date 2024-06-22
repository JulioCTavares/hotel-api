import { User } from '@/domains/user/entities'
import { UserFilters } from '@/domains/user/usecases'

export interface IGetUsersByFilterRepository {
  get(
    params: IGetUsersByFilterRepository.Params,
  ): Promise<IGetUsersByFilterRepository.Result>
}

export namespace IGetUsersByFilterRepository {
  export type Params = UserFilters
  export type Result = User[]
}
