import {
  IAccessTokenGenerator,
  IComparer,
  ILoggerLocal,
  IRefreshTokenGenerator,
} from '@/shared/protocols'
import {
  AccessDefaultPresenter,
  AuthUserDefaultPresenter,
  AuthUserTransformers,
} from '@/domains/auth/interface/presenters'
import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecase/repos'
import { JWTLoginUserRepository } from '@/domains/auth/usecase'

export interface LoginRequest {
  email: string
  password: string
}

export type LoginResponse = {
  access: AccessDefaultPresenter
  authUser: AuthUserDefaultPresenter
}

export class LoginController {
  private usecase: JWTLoginUserRepository
  private logger: ILoggerLocal

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    accessTokenGenerator: IAccessTokenGenerator,
    refreshTokenGenerator: IRefreshTokenGenerator,
    comparer: IComparer,
    logger: ILoggerLocal,
  ) {
    this.usecase = new JWTLoginUserRepository(
      getAuthUserByEmailRepository,
      accessTokenGenerator,
      refreshTokenGenerator,
      comparer,
      logger,
    )

    this.logger = logger.child({ controller: 'login' })
  }

  async execute(request: LoginRequest): Promise<LoginResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request })

    this.logger.logDebug({ message: 'Params Validated' })

    const { email, password } = request

    const { access, authUser } = await this.usecase.execute({
      email,
      password,
    })

    const accessDefaultPresenter: AccessDefaultPresenter = {
      access_token: access.accessToken,
      refresh_token: access.refreshToken,
    }

    const authUserDefaultPresenter: AuthUserDefaultPresenter =
      AuthUserTransformers.generateDefaultPresenter(authUser)

    this.logger.logDebug({
      message: 'Auth User logged',
      data: authUserDefaultPresenter,
    })

    return {
      access: accessDefaultPresenter,
      authUser: authUserDefaultPresenter,
    }
  }
}
