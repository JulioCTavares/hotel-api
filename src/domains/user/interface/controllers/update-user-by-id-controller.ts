import { UpdateUserByIdUsecase } from '@/domains/user/usecases'
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos'
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'

export interface UpdateUserByIdRequest {
  id: string
  paramsToUpdate: {
    name?: string
    password?: string
    email?: string
    birthDate?: Date
    phone?: string
    city?: string
    state?: string
    country?: string
  }
}

export type UpdateUserByIdResponse = UserDefaultPresenter

export class UpdateUserByIdController {
  private usecase: UpdateUserByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new UpdateUserByIdUsecase(
      getUserByIdRepository,
      updateUserRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'update-user-by-id' })
  }

  async execute(
    request: UpdateUserByIdRequest,
  ): Promise<UpdateUserByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id, paramsToUpdate } = request

    const userUpdated = await this.usecase.execute({ id, paramsToUpdate })

    this.logger.logDebug({ message: 'User updated', data: userUpdated })

    const userPresenter =
      UserTransformers.generateDefaultTransformer(userUpdated)

    return userPresenter
  }
}
