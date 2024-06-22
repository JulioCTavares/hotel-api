import {
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user/usecases/repos'
import { GetUsersByFilterController } from '@/domains/user/interface/controllers'

import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers'
import { DateFilter, OrderByMode, ValidationException } from '@/shared/helpers'
import { ZodError } from 'zod'

export type HttpGetUsersByFilterRequest = {
  email?: string
  birthDate?: Date
  phone?: string
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

export class HttpGetUsersByFilterController implements HttpController {
  private controller: GetUsersByFilterController
  private logger: ILoggerLocal

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'get-users-by-filter' })
  }

  async handle(
    httpRequest: HttpGetUsersByFilterRequest,
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const {
      email,
      birthDate,
      phone,
      city,
      state,
      country,
      created_at: createdAt,
      updated_at: updatedAt,
      order_by: orderBy,
      take,
      skip,
      count,
    } = httpRequest

    try {
      const users = await this.controller.execute({
        email,
        birthDate,
        phone,
        city,
        state,
        country,
        createdAt,
        updatedAt,
        orderBy,
        take,
        skip,
        count,
      })

      this.logger.logDebug({ message: 'Users found' })

      return ok(users)
    } catch (error) {
      if (error instanceof ValidationException || error instanceof ZodError) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
