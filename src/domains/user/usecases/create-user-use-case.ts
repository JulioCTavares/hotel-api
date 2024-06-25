import { User, UserRoles } from '@/domains/user/entities'
import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions'
import {
  IGetUserByEmailRepository,
  ISaveUserRepository,
} from '@/domains/user/usecases/repos'

import { IHasher, ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
export interface ICreateUserParams {
  name: string
  email: string
  password: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  role: UserRoles
  country?: string
}

export type ICreateUserResponse = User

export interface ICreateUserUsecase {
  execute(params: ICreateUserParams): Promise<ICreateUserResponse>
}

export class CreateUserUsecase implements ICreateUserUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly uuidGenerator: IUuidGenerator,
    private readonly hasher: IHasher,
    private readonly saveUserRepository: ISaveUserRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'create-user' })
  }

  async execute(params: ICreateUserParams): Promise<ICreateUserResponse> {
    this.logger.logDebug({ message: 'Request received', data: params })

    const { email } = params

    const userExists = await this.getUserByEmailRepository.getByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsException({ email })
    }

    const id = this.uuidGenerator.generate()

    const hashedPassword = await this.hasher.hash(params.password)

    const user = new User({ ...params, id, password: hashedPassword })

    const userCreated = await this.saveUserRepository.save({
      ...user,
    })

    this.logger.logDebug({
      message: 'User created in database',
      data: userCreated,
    })

    this.logger.logDebug({ message: 'User created', data: userCreated })

    return userCreated
  }
}
