import { PrismaClient } from '@prisma/client'

import { IGetUserByEmailRepository } from '@/domains/user/usecases/repos'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaException } from '@/shared/infra/prisma'

export class PrismaGetUserByEmailRepository
  implements IGetUserByEmailRepository
{
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async getByEmail(email: string): Promise<IGetUserByEmailRepository.Result> {
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
