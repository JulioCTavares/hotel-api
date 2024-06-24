import jwt from 'jsonwebtoken'
import { AuthUser } from '@/domains/auth/entities'
import { IAccessTokenValidator } from '@/shared/protocols'
import { env } from '@/config'

export class AccessTokenValidatorAdapter implements IAccessTokenValidator {
  validate(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload
      return {
        id: decoded.userId,
      } as AuthUser
    } catch (error) {
      return null
    }
  }
}
