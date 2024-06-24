import {
  IGetHotelsByFilterRepository,
  ICountHotelsByFilterRepository,
} from '@/domains/hotel/usecases/repos'
import { Hotel } from '@/domains/hotel/entities'

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers'

import { ILoggerLocal } from '@/shared/protocols'

export type HotelFilters = {
  filters: {
    name?: string
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

export interface IGetHotelsByFilterUsecase {
  execute(
    listParams: IGetHotelsByFilterUsecase.Params,
  ): Promise<IGetHotelsByFilterUsecase.Result>
}

export namespace IGetHotelsByFilterUsecase {
  export type Params = HotelFilters
  export type Result = { hotels?: Array<Hotel>; totalHotels: number }
}

export class GetHotelsByFilterUsecase implements IGetHotelsByFilterUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getHotelsByFilterRepository: IGetHotelsByFilterRepository,
    private readonly countHotelsByFilterRepository: ICountHotelsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'get-hotels-by-filter' })
  }

  async execute(
    filterParams: IGetHotelsByFilterUsecase.Params,
  ): Promise<IGetHotelsByFilterUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: filterParams })

    const { count, ...restFilterParams } = filterParams
    const { filters } = restFilterParams

    const totalHotels = await this.countHotelsByFilterRepository.count(filters)

    if (count) {
      return {
        totalHotels,
      }
    }

    const hotels = await this.getHotelsByFilterRepository.get(restFilterParams)

    this.logger.logDebug({
      message: 'Hotels found',
      data: { totalHotels },
    })

    return {
      hotels,
      totalHotels,
    }
  }
}
