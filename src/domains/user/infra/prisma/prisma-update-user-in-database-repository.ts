import { PrismaClient } from '@prisma/client'

import { IUpdateUserRepository } from '@/domains/user/usecases/repos'
import { PrismaException } from '@/shared/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'

export class PrismaUpdateUserRepository implements IUpdateUserRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async update(
    userToUpdate: IUpdateUserRepository.Params,
  ): Promise<IUpdateUserRepository.Result> {
    try {
      const { id, ...restOfUserInJSON } = userToUpdate

      const userUpdated = await this.prismaConnection.user.update({
        where: { id },
        data: restOfUserInJSON,
      })

      return PrismaUserMapper.toDomain(userUpdated)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
