import { GetUsersByFilterUsecase } from '@/domains/user/usecases'
import {
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user/usecases/repos'
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters'

import {
  DateFilter,
  OrderByFilter,
  OrderByMode,
  Pagination,
} from '@/shared/helpers'
import { ILoggerLocal } from '@/shared/protocols'

export interface GetUsersByFilterRequest {
  name?: string
  email?: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  country?: string
  createdAt?: DateFilter
  updatedAt?: DateFilter
  orderBy: {
    property?: string
    mode?: OrderByMode
  }
  take?: number
  skip?: number
  count?: boolean
}

export type GetUsersByFilterResponse =
  | {
    items: UserDefaultPresenter[]
    totalItemsListed: number
    totalItems: number
  }
  | { totalItems: number }

export class GetUsersByFilterController {
  private usecase: GetUsersByFilterUsecase
  private logger: ILoggerLocal

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetUsersByFilterUsecase(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'get-users-by-filter' })
  }

  async execute(
    request: GetUsersByFilterRequest,
  ): Promise<GetUsersByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    this.logger.logDebug({ message: 'Params validated' })

    const {
      orderBy: orderByFilter,
      take,
      skip,
      email,
      birthDate,
      phone,
      name,
      city,
      state,
      country,
      createdAt,
      updatedAt,
      count,
    } = request

    const filters = {
      name,
      email,
      birthDate,
      phone,
      city,
      state,
      country,
      createdAt,
      updatedAt,
    }

    const orderBy = new OrderByFilter(orderByFilter)
    const pagination = new Pagination({ take, skip })

    const { users, totalUsers } = await this.usecase.execute({
      filters,
      orderBy,
      pagination,
      count,
    })

    this.logger.logDebug({
      message: 'Users found',
      data: { totalUsers, totalItemsListed: users?.length },
    })

    if (count) {
      return {
        totalItems: totalUsers,
      }
    }

    const userPresenters =
      users?.map(UserTransformers.generateDefaultTransformer) ?? []

    return {
      items: userPresenters,
      totalItems: totalUsers,
      totalItemsListed: users?.length,
    }
  }
}
