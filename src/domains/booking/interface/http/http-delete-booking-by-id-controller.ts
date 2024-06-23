import {
  IDeleteBookingByIdRepository,
  IGetBookingByIdRepository,
} from '@/domains/booking/usecases/repos'
import { BookingNotFoundException } from '@/domains/booking/usecases/exceptions'
import { DeleteBookingByIdController } from '@/domains/booking/interface/controllers'

import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import {
  noContent,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'

export interface HttpDeleteBookingByIdRequest {
  id: string
}

export class HttpDeleteBookingByIdController implements HttpController {
  private controller: DeleteBookingByIdController
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    deleteBookingByIdRepository: IDeleteBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new DeleteBookingByIdController(
      getBookingByIdRepository,
      deleteBookingByIdRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'delete-booking-by-id' })
  }

  async handle(
    httpRequest: HttpDeleteBookingByIdRequest,
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id } = httpRequest

    try {
      await this.controller.execute({ id })

      this.logger.logDebug({
        message: 'Booking deleted',
        data: { id },
      })

      return noContent()
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
