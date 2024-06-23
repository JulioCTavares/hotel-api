import {
  PrismaUpdateUserRepository,
  PrismaGetUserByIdRepository,
} from '@/domains/user/infra/prisma'
import { HttpUpdateUserByIdController } from '@/domains/user/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpUpdateUserByIdController =
  (): HttpUpdateUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository()
    const updateUserByIdRepository = new PrismaUpdateUserRepository()
    const logger = pinoLoggerLocal

    return new HttpUpdateUserByIdController(
      getUserByIdRepository,
      updateUserByIdRepository,
      logger,
    )
  }
