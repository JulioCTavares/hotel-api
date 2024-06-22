import { User } from '@/domains/user/entities'
import {
  ICountUsersByFilterRepository,
  IGetUsersByFilterRepository,
} from '@/domains/user/usecases/repos'

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers'
import { ILoggerLocal } from '@/shared/protocols'

export type UserFilters = {
  filters: {
    email?: string
    birthDate?: Date
    phone?: string
    city?: string
    state?: string
    country?: string
    createdAt?: DateFilter
    updatedAt?: DateFilter
  }
  orderBy: OrderByFilter
  pagination: Pagination
  count?: boolean
}

export interface IGetUsersByFilterUsecase {
  execute(
    listParams: IGetUsersByFilterUsecase.Params,
  ): Promise<IGetUsersByFilterUsecase.Result>
}

export namespace IGetUsersByFilterUsecase {
  export type Params = UserFilters
  export type Result = { users?: User[]; totalUsers: number }
}

export class GetUsersByFilterUsecase implements IGetUsersByFilterUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getUsersByFilterRepository: IGetUsersByFilterRepository,
    private readonly countUsersByFilterRepository: ICountUsersByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'get-users-by-filter' })
  }

  async execute(
    filterParams: IGetUsersByFilterUsecase.Params,
  ): Promise<IGetUsersByFilterUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: filterParams })

    const { count, ...restFilterParams } = filterParams
    const { filters } = restFilterParams

    const totalUsers = await this.countUsersByFilterRepository.count(filters)

    if (count) {
      return {
        totalUsers,
      }
    }

    const users = await this.getUsersByFilterRepository.get(restFilterParams)

    this.logger.logDebug({ message: 'Users found', data: { totalUsers } })

    return {
      users,
      totalUsers,
    }
  }
}
