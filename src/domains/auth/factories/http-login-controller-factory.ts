import { PrismaGetAuthUserByEmailRepository } from '@/domains/auth/infra/prisma'

import { HttpLoginController } from '@/domains/auth/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'
import { BCryptCompareAdapter } from '@/shared/infra/bcrypt/compare'
import { AccessTokenGeneratorAdapter } from '@/shared/infra/jwt'
import { RefreshTokenGeneratorAdapter } from '@/shared/infra/jwt/refresh-token'

export const makeHttpLoginController = (): HttpLoginController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository()
  const accessTokenGenerator = new AccessTokenGeneratorAdapter()
  const refreshTokenGenerator = new RefreshTokenGeneratorAdapter()
  const comparer = new BCryptCompareAdapter()
  const loggerLocal = pinoLoggerLocal

  return new HttpLoginController(
    getAuthUserByEmailRepository,
    accessTokenGenerator,
    refreshTokenGenerator,
    comparer,
    loggerLocal,
  )
}
