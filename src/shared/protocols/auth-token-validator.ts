import { AuthUser } from '@/domains/auth/entities'

export interface IAccessTokenValidator {
  validate(token: string): AuthUser | null
}
