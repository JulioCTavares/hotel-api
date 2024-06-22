import { User } from '@/domains/user/entities'

export interface ISaveUserRepositoryParams {
  name: string
  email: string
  password: string
  isAdmin?: boolean
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  country?: string
}

export interface ISaveUserRepository {
  save(userParams: ISaveUserRepositoryParams): Promise<User>
}
