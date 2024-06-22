import { GetUserByIdUsecase } from '@/domains/user/usecases'
import { IGetUserByIdRepository } from '@/domains/user/usecases/repos'
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'

export interface GetUserByIdRequest {
  id: string
}

export type GetUserByIdResponse = UserDefaultPresenter | null

export class GetUserByIdController {
  private usecase: GetUserByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetUserByIdUsecase(getUserByIdRepository, logger)

    this.logger = logger.child({ controller: 'get-user-by-id' })
  }

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request })

    const { id } = request

    this.logger.logDebug({ message: 'Params Validated' })

    const user = await this.usecase.execute(id)

    this.logger.logDebug({ message: 'User found', data: user })

    if (!user) {
      return null
    }

    const userPresenter = UserTransformers.generateDefaultTransformer(user)

    return userPresenter
  }
}
