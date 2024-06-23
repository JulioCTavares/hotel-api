import { Access, AuthUser } from '@/domains/auth/entities'

export interface ILoginUserRepository {
  execute(
    loginParams: ILoginUserRepository.Params,
  ): Promise<ILoginUserRepository.Result>
}

export namespace ILoginUserRepository {
  export type Params = {
    email: string
    password: string
  }

  export type Result = { access: Access; authUser: AuthUser }
}
