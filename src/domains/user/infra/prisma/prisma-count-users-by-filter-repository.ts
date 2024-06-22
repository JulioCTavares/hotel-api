import { ICountUsersByFilterRepository } from '@/domains/user/usecases/repos'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaException, PrismaFormatter } from '@/shared/infra/prisma'
import { PrismaClient } from '@prisma/client'

export class PrismaCountUsersByFilterRepository
  implements ICountUsersByFilterRepository
{
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async count(
    filter: ICountUsersByFilterRepository.Params,
  ): Promise<ICountUsersByFilterRepository.Result> {
    try {
      const filterParams = PrismaFormatter.formatFilter(filter)

      const totalUsers = await this.prismaConnection.user.count({
        where: filterParams,
      })

      return totalUsers
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
