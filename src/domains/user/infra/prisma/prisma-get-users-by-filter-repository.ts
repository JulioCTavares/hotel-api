import { PrismaClient } from '@prisma/client'

import { IGetUsersByFilterRepository } from '@/domains/user/usecases/repos'

import { PrismaException } from '@/shared/infra/prisma'
import { PrismaFormatter } from '@/shared/infra/prisma/prisma-formatter'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'

export class PrismaGetUsersByFilterRepository
  implements IGetUsersByFilterRepository
{
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async get(
    filter: IGetUsersByFilterRepository.Params,
  ): Promise<IGetUsersByFilterRepository.Result> {
    try {
      const { orderBy, pagination, filters } = filter

      const filtersFormated = PrismaFormatter.formatFilter(filters)

      const users = await this.prismaConnection.user.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      })

      return users.map((user) => PrismaUserMapper.toDomain(user))
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
