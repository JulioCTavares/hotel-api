import {
  IUpdateHotelRepository,
  IGetHotelByIdRepository,
} from '@/domains/hotel/usecases/repos'
import { HotelNotFoundException } from '@/domains/hotel/usecases/exceptions'
import { UpdateHotelByIdController } from '@/domains/hotel/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'

export interface HttpUpdateHotelByIdRequest {
  id: string
  name?: string
}

export class HttpUpdateHotelByIdController implements HttpController {
  private controller: UpdateHotelByIdController
  private logger: ILoggerLocal

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    updateHotelRepository: IUpdateHotelRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new UpdateHotelByIdController(
      getHotelByIdRepository,
      updateHotelRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'update-hotel-by-id' })
  }

  async handle(httpRequest: HttpUpdateHotelByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id, name } = httpRequest

    const request = {
      id,
      paramsToUpdate: {
        name,
      },
    }

    try {
      const hotelUpdated = await this.controller.execute(request)

      this.logger.logDebug({
        message: 'Hotel updated',
        data: hotelUpdated,
      })

      return ok(hotelUpdated)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      if (error instanceof HotelNotFoundException) {
        return notFound(error)
      }

      return serverError(error as Error)
    }
  }
}
