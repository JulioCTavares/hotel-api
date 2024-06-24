import { IGetHotelByIdRepository } from '@/domains/hotel/usecases/repos'
import { HotelNotFoundException } from '@/domains/hotel/usecases/exceptions'
import { GetHotelByIdController } from '@/domains/hotel/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'

export interface HttpGetHotelByIdRequest {
  id: string
}

export class HttpGetHotelByIdController implements HttpController {
  private controller: GetHotelByIdController
  private logger: ILoggerLocal

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetHotelByIdController(getHotelByIdRepository, logger)

    this.logger = logger.child({ httpController: 'get-hotel-by-id' })
  }

  async handle(httpRequest: HttpGetHotelByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id } = httpRequest

    try {
      const hotel = await this.controller.execute({ id })

      this.logger.logDebug({
        message: 'Hotel found',
        data: hotel,
      })

      if (!hotel) {
        return notFound(new HotelNotFoundException({ id }))
      }

      return ok(hotel)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
