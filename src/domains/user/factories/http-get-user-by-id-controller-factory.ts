import { PrismaGetUserByIdRepository } from '@/domains/user/infra/prisma'
import { HttpGetUserByIdController } from '@/domains/user/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'

export const makeHttpGetUserByIdController = (): HttpGetUserByIdController => {
  const getUserByIdRepository = new PrismaGetUserByIdRepository()

  const logger = pinoLoggerLocal

  return new HttpGetUserByIdController(getUserByIdRepository, logger)
}
