import {
  IGetBookingsByFilterRepository,
  ICountBookingsByFilterRepository,
} from '@/domains/booking/usecases/repos'
import { GetBookingsByFilterController } from '@/domains/booking/interface/controllers'

import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers'
import { DateFilter, OrderByMode, ValidationException } from '@/shared/helpers'
import { BookingStatus } from '../../entities'

export type HttpGetBookingsByFilterRequest = {
  roomNumber?: number
  bookingAmount?: number
  bookingDate?: Date
  startDate?: Date
  endDate?: Date
  userId?: string
  status?: BookingStatus
  created_at?: DateFilter
  updated_at?: DateFilter
  order_by: {
    property?: string
    mode?: OrderByMode
  }
  take?: number
  skip?: number
  count?: boolean
}

export class HttpGetBookingsByFilterController implements HttpController {
  private controller: GetBookingsByFilterController
  private logger: ILoggerLocal

  constructor(
    getBookingsByFilterRepository: IGetBookingsByFilterRepository,
    countBookingsByFilterRepository: ICountBookingsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetBookingsByFilterController(
      getBookingsByFilterRepository,
      countBookingsByFilterRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'get-bookings-by-filter' })
  }

  async handle(
    httpRequest: HttpGetBookingsByFilterRequest,
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const {
      roomNumber,
      bookingAmount,
      bookingDate,
      startDate,
      endDate,
      userId,
      status,
      created_at: createdAt,
      updated_at: updatedAt,
      order_by: orderBy,
      take,
      skip,
      count,
    } = httpRequest

    try {
      const bookings = await this.controller.execute({
        roomNumber,
        bookingAmount,
        bookingDate,
        startDate,
        endDate,
        userId,
        status,
        createdAt,
        updatedAt,
        orderBy,
        take,
        skip,
        count,
      })

      this.logger.logDebug({ message: 'Bookings found' })

      return ok(bookings)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
