import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import {
  IGetUserByIdRepository,
  IDeleteUserByIdRepository,
} from '@/domains/user/usecases/repos'

import { ILoggerLocal } from '@/shared/protocols'

export interface IDeleteUserByIdUsecase {
  execute(
    id: IDeleteUserByIdUsecase.Params,
  ): Promise<IDeleteUserByIdUsecase.Result>
}

export namespace IDeleteUserByIdUsecase {
  export type Params = string
  export type Result = void
}

export class DeleteUserByIdUsecase implements IDeleteUserByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly deleteUserByIdRepository: IDeleteUserByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'delete-user-by-id' })
  }

  async execute(
    id: IDeleteUserByIdUsecase.Params,
  ): Promise<IDeleteUserByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request Received', data: { id } })

    const userExists = await this.getUserByIdRepository.getById(id)

    if (!userExists) {
      throw new UserNotFoundException({ id })
    }

    this.logger.logDebug({
      message: 'User found in database',
      data: userExists,
    })

    await this.deleteUserByIdRepository.delete(id)

    this.logger.logDebug({
      message: 'User delete from database',
      data: { id },
    })
  }
}
