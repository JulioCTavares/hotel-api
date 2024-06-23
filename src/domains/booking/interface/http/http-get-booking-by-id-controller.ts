import { IGetBookingByIdRepository } from '@/domains/booking/usecases/repos'
import { BookingNotFoundException } from '@/domains/booking/usecases/exceptions'
import { GetBookingByIdController } from '@/domains/booking/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'

export interface HttpGetBookingByIdRequest {
  id: string
}

export class HttpGetBookingByIdController implements HttpController {
  private controller: GetBookingByIdController
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetBookingByIdController(
      getBookingByIdRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'get-booking-by-id' })
  }

  async handle(httpRequest: HttpGetBookingByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id } = httpRequest

    try {
      const booking = await this.controller.execute({ id })

      this.logger.logDebug({
        message: 'Booking found',
        data: booking,
      })

      if (!booking) {
        return notFound(new BookingNotFoundException({ id }))
      }

      return ok(booking)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
