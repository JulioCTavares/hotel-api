import { AuthUser } from '@/domains/auth/entities'

export interface IAccessTokenGenerator {
  generate(authUser: AuthUser): string
}
