import { PrismaClient } from '@prisma/client'

import {
  ISaveUserRepository,
  ISaveUserRepositoryParams,
} from '@/domains/user/usecases/repos'
import { User } from '@/domains/user/entities'
import { prismaConnector } from '@/main/infra/prisma'
import { PrismaException } from '@/shared/infra/prisma'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'

export class PrismaSaveUserRepository implements ISaveUserRepository {
  private prismaConnection: PrismaClient

  constructor() {
    this.prismaConnection = prismaConnector.connect()
  }

  async save(userParams: ISaveUserRepositoryParams): Promise<User> {
    try {
      const userCreated = await this.prismaConnection.user.create({
        data: userParams,
      })

      return PrismaUserMapper.toDomain(userCreated)
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
