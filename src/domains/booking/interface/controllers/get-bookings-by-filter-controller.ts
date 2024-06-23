import { GetBookingsByFilterUsecase } from '@/domains/booking/usecases'
import {
  ICountBookingsByFilterRepository,
  IGetBookingsByFilterRepository,
} from '@/domains/booking/usecases/repos'

import {
  BookingDefaultPresenter,
  BookingTransformers,
} from '@/domains/booking/interface/presenters'

import {
  OrderByFilter,
  OrderByMode,
  DateFilter,
  Pagination,
} from '@/shared/helpers'

import { ILoggerLocal } from '@/shared/protocols'
import { BookingStatus } from '../../entities'

export interface GetBookingsByFilterRequest {
  roomNumber?: number
  bookingAmount?: number
  bookingDate?: Date
  startDate?: Date
  endDate?: Date
  userId?: string
  status?: BookingStatus
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

export type GetBookingsByFilterResponse =
  | {
    items: BookingDefaultPresenter[]
    totalItemsListed: number
    totalItems: number
  }
  | { totalItems: number }

export class GetBookingsByFilterController {
  private usecase: GetBookingsByFilterUsecase
  private logger: ILoggerLocal

  constructor(
    getBookingsByFilterRepository: IGetBookingsByFilterRepository,
    countBookingsByFilterRepository: ICountBookingsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetBookingsByFilterUsecase(
      getBookingsByFilterRepository,
      countBookingsByFilterRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'get-bookings-by-filter' })
  }

  async execute(
    request: GetBookingsByFilterRequest,
  ): Promise<GetBookingsByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const {
      orderBy: orderByDTO,
      take,
      skip,
      roomNumber,
      bookingAmount,
      bookingDate,
      startDate,
      endDate,
      userId,
      status,
      createdAt,
      updatedAt,
      count,
    } = request

    const orderBy = new OrderByFilter(orderByDTO)
    const pagination = new Pagination({ take, skip })

    const { bookings, totalBookings } = await this.usecase.execute({
      filters: {
        roomNumber,
        bookingAmount,
        bookingDate,
        startDate,
        endDate,
        userId,
        status,
        createdAt,
        updatedAt,
      },
      orderBy,
      pagination,
      count,
    })

    this.logger.logDebug({
      message: 'Bookings found',
      data: { totalBookings, totalItemsListed: bookings?.length },
    })

    if (count) {
      return {
        totalItems: totalBookings,
      }
    }

    const bookingsDTOs = bookings?.map((booking) =>
      BookingTransformers.generateDefaultPresenter(booking),
    )

    return {
      items: bookingsDTOs,
      totalItems: totalBookings,
      totalItemsListed: bookingsDTOs?.length,
    }
  }
}
