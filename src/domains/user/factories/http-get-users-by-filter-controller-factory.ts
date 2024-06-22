import {
  PrismaGetUsersByFilterRepository,
  PrismaCountUsersByFilterRepository,
} from '@/domains/user/infra/prisma'
import { HttpGetUsersByFilterController } from '@/domains/user/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetUsersByFilterController =
  (): HttpGetUsersByFilterController => {
    const getUsersByFilterRepository = new PrismaGetUsersByFilterRepository()
    const countUsersByFilterRepository =
      new PrismaCountUsersByFilterRepository()
    const logger = pinoLoggerLocal

    return new HttpGetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      logger,
    )
  }
