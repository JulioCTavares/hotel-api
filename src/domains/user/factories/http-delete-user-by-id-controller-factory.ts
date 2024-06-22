import {
  PrismaDeleteUserByIdRepository,
  PrismaGetUserByIdRepository,
} from '@/domains/user/infra/prisma'

import { HttpDeleteUserByIdController } from '@/domains/user/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpDeleteUserByIdController =
  (): HttpDeleteUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository()
    const deleteUserByIdRepository = new PrismaDeleteUserByIdRepository()
    const logger = pinoLoggerLocal

    return new HttpDeleteUserByIdController(
      getUserByIdRepository,
      deleteUserByIdRepository,
      logger,
    )
  }
