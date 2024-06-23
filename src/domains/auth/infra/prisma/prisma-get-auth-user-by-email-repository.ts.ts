import { PrismaClient } from '@prisma/client'

import { prismaConnector } from '@/main/infra/prisma'
import { PrismaException } from '@/shared/infra/prisma'
import { IGetAuthUserByEmailRepository } from '../../usecase/repos'
import { PrismaUserMapper } from '@/domains/user/infra/prisma/mappers/prisma-user-mapper'

export class PrismaGetAuthUserByEmailRepository
  implements IGetAuthUserByEmailRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async getByEmail(
    email: string,
  ): Promise<IGetAuthUserByEmailRepository.Result> {
    try {
      const [user] = await this.prismaConnection.user.findMany({
        where: { email },
      })

      return user ? PrismaUserMapper.toDomain(user) : null
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
