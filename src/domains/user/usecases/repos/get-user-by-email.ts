import { User } from '@/domains/user/entities'

export interface IGetUserByEmailRepository {
  getByEmail(
    email: IGetUserByEmailRepository.Params,
  ): Promise<IGetUserByEmailRepository.Result>
}

export namespace IGetUserByEmailRepository {
  export type Params = string
  export type Result = Omit<Partial<User>, 'password'> | null
}
