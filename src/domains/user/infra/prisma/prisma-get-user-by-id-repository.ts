import { PrismaClient } from '@prisma/client'

import { IGetUserByIdRepository } from '@/domains/user/usecases/repos'
import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async getById(
    id?: IGetUserByIdRepository.Params,
  ): Promise<IGetUserByIdRepository.Result> {
    try {
      const user = await this.prismaConnection.user.findUnique({
        where: { id },
      })
      if (!user) {
        return null
      }

      return PrismaUserMapper.toDomain(user)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
