import {
  IUpdateBookingRepository,
  IGetBookingByIdRepository,
} from '@/domains/booking/usecases/repos'
import { BookingNotFoundException } from '@/domains/booking/usecases/exceptions'
import { UpdateBookingByIdController } from '@/domains/booking/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { BookingStatus } from '../../entities'
import { ValidationException } from '@/shared/helpers'

export interface HttpUpdateBookingByIdRequest {
  id: string
  roomNumber?: number
  bookingAmount?: number
  bookingDate?: Date
  startDate?: Date
  endDate?: Date
  userId?: string
  hotelId?: string
  status?: BookingStatus
}

export class HttpUpdateBookingByIdController implements HttpController {
  private controller: UpdateBookingByIdController
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    updateBookingRepository: IUpdateBookingRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new UpdateBookingByIdController(
      getBookingByIdRepository,
      updateBookingRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'update-booking-by-id' })
  }

  async handle(
    httpRequest: HttpUpdateBookingByIdRequest,
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id, ...restRequest } = httpRequest

    const request = {
      id,
      paramsToUpdate: restRequest,
    }

    try {
      const bookingUpdated = await this.controller.execute(request)

      this.logger.logDebug({
        message: 'Booking updated',
        data: bookingUpdated,
      })

      return ok(bookingUpdated)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      if (error instanceof BookingNotFoundException) {
        return notFound(error)
      }

      return serverError(error as Error)
    }
  }
}
