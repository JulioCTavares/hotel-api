import { IGetUserByIdRepository } from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { GetUserByIdController } from '@/domains/user/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'
export interface HttpGetUserByIdRequest {
  id: string
}

export class HttpGetUserByIdController implements HttpController {
  private controller: GetUserByIdController
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new GetUserByIdController(getUserByIdRepository, logger)

    this.logger = logger.child({ httpController: 'get-user-by-id' })
  }

  async handle(httpRequest: HttpGetUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id } = httpRequest

    try {
      const user = await this.controller.execute({ id })

      this.logger.logDebug({ message: 'User found', data: user })

      if (!user) {
        return notFound(new UserNotFoundException({ id }))
      }

      return ok(user)
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
