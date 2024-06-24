import jwt from 'jsonwebtoken'
import { AuthUser } from '@/domains/auth/entities'
import { IAccessTokenGenerator } from '@/shared/protocols'
import { env } from '@/config'

export class AccessTokenGeneratorAdapter implements IAccessTokenGenerator {
  generate(authUser: AuthUser): string {
    return jwt.sign(
      {
        userId: authUser.id,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRATION },
    )
  }
}
