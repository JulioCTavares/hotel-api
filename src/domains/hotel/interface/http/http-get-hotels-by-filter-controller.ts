import {
  IGetHotelsByFilterRepository,
  ICountHotelsByFilterRepository,
} from '@/domains/hotel/usecases/repos'
import { GetHotelsByFilterController } from '@/domains/hotel/interface/controllers'

import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers'
import { DateFilter, OrderByMode, ValidationException } from '@/shared/helpers'

export type HttpGetHotelsByFilterRequest = {
  name?: string
  city?: string
  state?: string
  country?: string
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

export class HttpGetHotelsByFilterController implements HttpController {
  private controller: GetHotelsByFilterController
  private logger: ILoggerLocal

  constructor(
    getHotelsByFilterRepository: IGetHotelsByFilterRepository,
    countHotelsByFilterRepository: ICountHotelsByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetHotelsByFilterController(
      getHotelsByFilterRepository,
      countHotelsByFilterRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'get-hotels-by-filter' })
  }

  async handle(
    httpRequest: HttpGetHotelsByFilterRequest,
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const {
      name,
      created_at: createdAt,
      updated_at: updatedAt,
      order_by: orderBy,
      take,
      skip,
      count,
    } = httpRequest

    try {
      const hotels = await this.controller.execute({
        name,
        createdAt,
        updatedAt,
        orderBy,
        take,
        skip,
        count,
      })

      this.logger.logDebug({ message: 'Hotels found' })

      return ok(hotels)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
