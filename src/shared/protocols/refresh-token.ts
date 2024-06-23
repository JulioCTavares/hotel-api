import { AuthUser } from '@/domains/auth/entities'

export interface IRefreshTokenGenerator {
  generate(authUser: AuthUser): string
}
