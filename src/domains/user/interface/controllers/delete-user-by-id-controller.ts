import { DeleteUserByIdUsecase } from '@/domains/user/usecases'
import {
  IGetUserByIdRepository,
  IDeleteUserByIdRepository,
} from '@/domains/user/usecases/repos'

import { ILoggerLocal } from '@/shared/protocols'

export interface DeleteUserByIdRequest {
  id: string
}

export type DeleteUserByIdResponse = void

export class DeleteUserByIdController {
  private usecase: DeleteUserByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new DeleteUserByIdUsecase(
      getUserByIdRepository,
      deleteUserByIdRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'delete-user-by-id' })
  }

  async execute(
    request: DeleteUserByIdRequest,
  ): Promise<DeleteUserByIdResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request })
    const { id } = request

    this.logger.logDebug({ message: 'Params validated' })

    await this.usecase.execute(id)

    this.logger.logDebug({ message: 'User deleted', data: { id } })
  }
}
