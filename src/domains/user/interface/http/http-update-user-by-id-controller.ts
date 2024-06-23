import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { UpdateUserByIdController } from '@/domains/user/interface/controllers'

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers'
import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ILoggerLocal } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'
import { ZodError } from 'zod'

export interface HttpUpdateUserByIdRequest {
  id: string
  name?: string
  password?: string
  email?: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  country?: string
}

export class HttpUpdateUserByIdController implements HttpController {
  private controller: UpdateUserByIdController
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new UpdateUserByIdController(
      getUserByIdRepository,
      updateUserRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'update-user-by-id' })
  }

  async handle(httpRequest: HttpUpdateUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request received', data: httpRequest })

    const { id, ...restRequest } = httpRequest

    const request = {
      id,
      paramsToUpdate: restRequest,
    }

    try {
      const userUpdated = await this.controller.execute(request)

      this.logger.logDebug({ message: 'User updated', data: userUpdated })

      return ok(userUpdated)
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
