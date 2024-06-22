import {
  PrismaGetUserByEmailRepository,
  PrismaSaveUserRepository,
} from '@/domains/user/infra/prisma'
import { pinoLoggerLocal } from '@/main/infra/logs'

import { UUIDGeneratorAdapter } from '@/shared/infra/uuid'
import { HttpCreateUserController } from '@/domains/user/interface/http'
import { BCryptHasherAdapter } from '@/shared/infra/bcrypt/hash'

export const makeHttpCreateUserController = (): HttpCreateUserController => {
  const getUserByEmailRepository = new PrismaGetUserByEmailRepository()
  const hasher = new BCryptHasherAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const saveUserRepository = new PrismaSaveUserRepository()
  const logger = pinoLoggerLocal

  return new HttpCreateUserController(
    getUserByEmailRepository,
    uuidGenerator,
    hasher,
    saveUserRepository,
    logger,
  )
}
