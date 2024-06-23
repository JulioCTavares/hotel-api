import { User } from '@/domains/user/entities'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos'

import { ILoggerLocal } from '@/shared/protocols'

export interface IUpdateUserByIdUsecase {
  execute(
    updateParams: IUpdateUserByIdUsecase.Params,
  ): Promise<IUpdateUserByIdUsecase.Result>
}

export namespace IUpdateUserByIdUsecase {
  export type Params = {
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
  export type Result = User
}

export class UpdateUserByIdUsecase implements IUpdateUserByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'update-user-by-id' })
  }

  async execute(
    updateParams: IUpdateUserByIdUsecase.Params,
  ): Promise<IUpdateUserByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams })

    const { id, paramsToUpdate } = updateParams

    const userExists = await this.getUserByIdRepository.getById(id)

    if (!userExists) {
      throw new UserNotFoundException({ id })
    }

    this.logger.logDebug({ message: 'User found', data: userExists })

    const userToUpdate = new User({ ...userExists, ...paramsToUpdate })

    const userUpdated = await this.updateUserRepository.update({
      ...userToUpdate,
    })

    this.logger.logDebug({ message: 'User updated', data: userUpdated })

    return userUpdated
  }
}
