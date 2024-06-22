import {
  IDeleteUserByIdRepository,
  IGetUserByIdRepository,
} from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { DeleteUserByIdController } from '@/domains/user/interface/controllers'

import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import {
  noContent,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'
import { ZodError } from 'zod'

export interface HttpDeleteUserByIdRequest {
  id: string
}

export class HttpDeleteUserByIdController implements HttpController {
  private controller: DeleteUserByIdController
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new DeleteUserByIdController(
      getUserByIdRepository,
      deleteUserByIdRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'delete-user-by-id' })
  }

  async handle(httpRequest: HttpDeleteUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { id } = httpRequest

    try {
      await this.controller.execute({ id })

      this.logger.logDebug({ message: 'User deleted', data: { id } })

      return noContent()
    } catch (error) {
      if (error instanceof ValidationException || error instanceof ZodError) {
        return badRequest(error)
      }

      if (error instanceof UserNotFoundException) {
        return notFound(error)
      }

      return serverError(error as Error)
    }
  }
}
