import { GetHotelsByFilterUsecase } from '@/domains/hotel/usecases'
import {
  ICountHotelsByFilterRepository,
  IGetHotelsByFilterRepository,
} from '@/domains/hotel/usecases/repos'

import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters'

import {
  OrderByFilter,
  OrderByMode,
  DateFilter,
  Pagination,
} from '@/shared/helpers'

import { ILoggerLocal } from '@/shared/protocols'

export interface GetHotelsByFilterRequest {
  name?: string
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

export type GetHotelsByFilterResponse =
  | {
    items: HotelDefaultPresenter[]
    totalItemsListed: number
    totalItems: number
  }
  | { totalItems: number }

export class GetHotelsByFilterController {
  private usecase: GetHotelsByFilterUsecase
  private logger: ILoggerLocal

  constructor(
    getHotelsByFilterRepository: IGetHotelsByFilterRepository,
    countHotelsByFilterRepository: ICountHotelsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetHotelsByFilterUsecase(
      getHotelsByFilterRepository,
      countHotelsByFilterRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'get-hotels-by-filter' })
  }

  async execute(
    request: GetHotelsByFilterRequest,
  ): Promise<GetHotelsByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const {
      orderBy: orderByDTO,
      take,
      skip,
      name,
      city,
      state,
      country,
      createdAt,
      updatedAt,
      count,
    } = request

    const orderBy = new OrderByFilter(orderByDTO)
    const pagination = new Pagination({ take, skip })

    const { hotels, totalHotels } = await this.usecase.execute({
      filters: {
        name,
        city,
        state,
        country,
        createdAt,
        updatedAt,
      },
      orderBy,
      pagination,
      count,
    })

    this.logger.logDebug({
      message: 'Hotels found',
      data: { totalHotels, totalItemsListed: hotels?.length },
    })

    if (count) {
      return {
        totalItems: totalHotels,
      }
    }

    const hotelsDTOs = hotels?.map((hotel) =>
      HotelTransformers.generateDefaultPresenter(hotel),
    )

    return {
      items: hotelsDTOs,
      totalItems: totalHotels,
      totalItemsListed: hotelsDTOs?.length,
    }
  }
}
