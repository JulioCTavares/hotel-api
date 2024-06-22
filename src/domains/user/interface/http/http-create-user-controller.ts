import {
  IGetUserByEmailRepository,
  ISaveUserRepository,
} from '@/domains/user/usecases/repos'
import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions'

import { HttpResponse, HttpController } from '@/shared/interface/http/protocols'
import { ValidationException } from '@/shared/helpers'
import { IHasher, ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import {
  badRequest,
  created,
  serverError,
} from '@/shared/interface/http/helpers'
import { CreateUserController } from '@/domains/user/interface/controllers'
import { ZodError } from 'zod'

export interface HttpCreateUserRequest {
  name: string
  email: string
  password: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  country?: string
}

export class HttpCreateUserController implements HttpController {
  private controller: CreateUserController
  private logger: ILoggerLocal

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    uuidGenerator: IUuidGenerator,
    hasher: IHasher,
    saveUserRepository: ISaveUserRepository,
    logger: ILoggerLocal,
  ) {
    this.controller = new CreateUserController(
      getUserByEmailRepository,
      uuidGenerator,
      hasher,
      saveUserRepository,
      logger,
    )

    this.logger = logger.child({ httpController: 'create-user' })
  }

  async handle(httpRequest: HttpCreateUserRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    try {
      const userCreated = await this.controller.execute({
        ...httpRequest,
        birthDate: httpRequest.birthDate
          ? new Date(httpRequest.birthDate)
          : undefined,
      })

      this.logger.logDebug({ message: 'User created', data: userCreated })

      return created(userCreated)
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof UserAlreadyExistsException ||
        error instanceof ZodError
      ) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
