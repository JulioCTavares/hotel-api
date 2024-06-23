import jwt from 'jsonwebtoken'
import { AuthUser } from '@/domains/auth/entities'
import { IRefreshTokenGenerator } from '@/shared/protocols'
import { env } from '@/config'

export class RefreshTokenGeneratorAdapter implements IRefreshTokenGenerator {
  generate(authUser: AuthUser): string {
    return jwt.sign(
      {
        userId: authUser.id,
      },
      env.JWT_SECRET,
      { expiresIn: env.REFRESH_TOKEN_EXPIRATION },
    )
  }
}
