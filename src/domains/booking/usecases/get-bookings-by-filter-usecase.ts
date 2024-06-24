import {
  IGetBookingsByFilterRepository,
  ICountBookingsByFilterRepository,
} from '@/domains/booking/usecases/repos'
import { Booking, BookingStatus } from '@/domains/booking/entities'

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers'

import { ILoggerLocal } from '@/shared/protocols'

export type BookingFilters = {
  filters: {
    roomNumber?: number
    bookingAmount?: number
    bookingDate?: Date
    startDate?: Date
    endDate?: Date
    userId?: string
    hotelId?: string
    status?: BookingStatus
    createdAt?: DateFilter
    updatedAt?: DateFilter
  }
  orderBy: OrderByFilter
  pagination: Pagination
  count?: boolean
}

export interface IGetBookingsByFilterUsecase {
  execute(
    listParams: IGetBookingsByFilterUsecase.Params,
  ): Promise<IGetBookingsByFilterUsecase.Result>
}

export namespace IGetBookingsByFilterUsecase {
  export type Params = BookingFilters
  export type Result = { bookings?: Array<Booking>; totalBookings: number }
}

export class GetBookingsByFilterUsecase implements IGetBookingsByFilterUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getBookingsByFilterRepository: IGetBookingsByFilterRepository,
    private readonly countBookingsByFilterRepository: ICountBookingsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'get-bookings-by-filter' })
  }

  async execute(
    filterParams: IGetBookingsByFilterUsecase.Params,
  ): Promise<IGetBookingsByFilterUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: filterParams })

    const { count, ...restFilterParams } = filterParams
    const { filters } = restFilterParams

    const totalBookings =
      await this.countBookingsByFilterRepository.count(filters)

    if (count) {
      return {
        totalBookings,
      }
    }

    const bookings =
      await this.getBookingsByFilterRepository.get(restFilterParams)

    this.logger.logDebug({
      message: 'Bookings found',
      data: { totalBookings },
    })

    return {
      bookings,
      totalBookings,
    }
  }
}
