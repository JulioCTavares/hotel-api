import { CreateUserUsecase } from '@/domains/user/usecases'
import {
  ISaveUserRepository,
  IGetUserByEmailRepository,
} from '@/domains/user/usecases/repos'
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters'

import { IHasher, ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import { z } from 'zod'
import { UserRoles } from '../../entities'

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  country?: string
}

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum([UserRoles.ADMIN, UserRoles.USER]),
  birthDate: z.date().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
})

export type CreateUserResponse = UserDefaultPresenter

export class CreateUserController {
  private usecase: CreateUserUsecase
  private logger: ILoggerLocal

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    uuidGenerator: IUuidGenerator,
    hasher: IHasher,
    saveUserRepository: ISaveUserRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new CreateUserUsecase(
      getUserByEmailRepository,
      uuidGenerator,
      hasher,
      saveUserRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'create-user' })
  }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request })

    const validatedRequest = createUserSchema.parse(request)

    this.logger.logDebug({ message: 'Params validated' })

    const userCreated = await this.usecase.execute(validatedRequest)

    this.logger.logDebug({ message: 'User created', data: userCreated })

    const userPresenter =
      UserTransformers.generateDefaultTransformer(userCreated)

    return userPresenter
  }
}
