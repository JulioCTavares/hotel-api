import { ISaveHotelRepository } from '@/domains/hotel/usecases/repos'
import { HotelAlreadyExistsException } from '@/domains/hotel/usecases/exceptions'
import { CreateHotelController } from '@/domains/hotel/interface/controllers'

import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ValidationException } from '@/shared/helpers'
import {
  badRequest,
  created,
  serverError,
} from '@/shared/interface/http/helpers'
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import { ZodError } from 'zod'

export interface HttpCreateHotelRequest {
  name: string
  city: string
  state: string
  country: string
}

export class HttpCreateHotelController implements HttpController {
  private controller: CreateHotelController
  private logger: ILoggerLocal

  constructor(
    saveHotelRepository: ISaveHotelRepository,
    uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.controller = new CreateHotelController(
      saveHotelRepository,
      uuidGenerator,
      logger,
    )

    this.logger = logger.child({ httpController: 'create-hotel' })
  }

  async handle(httpRequest: HttpCreateHotelRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    try {
      const hotelCreated = await this.controller.execute(httpRequest)

      this.logger.logDebug({
        message: 'Hotel created',
        data: hotelCreated,
      })

      return created(hotelCreated)
    } catch (error) {
      if (error instanceof ValidationException || error instanceof ZodError) {
        return badRequest(error)
      }

      if (error instanceof HotelAlreadyExistsException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
