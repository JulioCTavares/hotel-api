import { ISaveBookingRepository } from '@/domains/booking/usecases/repos'
import { CreateBookingController } from '@/domains/booking/interface/controllers'

import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ValidationException } from '@/shared/helpers'
import {
  badRequest,
  created,
  serverError,
} from '@/shared/interface/http/helpers'
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import { BookingStatus } from '@/domains/booking/entities'
import { ZodError } from 'zod'

export interface HttpCreateBookingRequest {
  roomNumber: number
  bookingAmount: number
  bookingDate: Date
  startDate: Date
  endDate: Date
  status: BookingStatus
  userId: string
  hotelId?: string
}

export class HttpCreateBookingController implements HttpController {
  private controller: CreateBookingController
  private logger: ILoggerLocal

  constructor(
    saveBookingRepository: ISaveBookingRepository,
    uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.controller = new CreateBookingController(
      saveBookingRepository,
      uuidGenerator,
      logger,
    )

    this.logger = logger.child({ httpController: 'create-booking' })
  }

  async handle(httpRequest: HttpCreateBookingRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    try {
      const bookingCreated = await this.controller.execute(httpRequest)

      this.logger.logDebug({
        message: 'Booking created',
        data: bookingCreated,
      })

      return created(bookingCreated)
    } catch (error) {
      if (error instanceof ValidationException || error instanceof ZodError) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
