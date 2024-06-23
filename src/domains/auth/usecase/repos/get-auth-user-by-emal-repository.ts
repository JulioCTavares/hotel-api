import { User } from '@/domains/user/entities'

export interface IGetAuthUserByEmailRepository {
  getByEmail(
    email: IGetAuthUserByEmailRepository.Params,
  ): Promise<IGetAuthUserByEmailRepository.Result>
}

export namespace IGetAuthUserByEmailRepository {
  export type Params = string
  export type Result = User | null
}
