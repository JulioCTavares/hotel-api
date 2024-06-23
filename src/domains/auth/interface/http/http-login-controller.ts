import { LoginController } from '@/domains/auth/interface/controllers'
import {
  IAccessTokenGenerator,
  IComparer,
  ILoggerLocal,
  IRefreshTokenGenerator,
} from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'
import {
  AccessDefaultPresenter,
  AuthUserDefaultPresenter,
} from '@/domains/auth/interface/presenters'
import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ok, serverError, unauthorized } from '@/shared/interface/http/helpers'
import { IGetAuthUserByEmailRepository } from '../../usecase/repos'
import { InvalidCredentialsException } from '../../usecase/exceptions'

export interface HttpLoginRequest {
  email: string
  password: string
}

export class HttpLoginController implements HttpController {
  private controller: LoginController
  private logger: ILoggerLocal

  constructor(
    getUserByEmailRepository: IGetAuthUserByEmailRepository,
    accessTokenGenerator: IAccessTokenGenerator,
    refreshTokenGenerator: IRefreshTokenGenerator,
    comparer: IComparer,
    logger: ILoggerLocal,
  ) {
    this.controller = new LoginController(
      getUserByEmailRepository,
      accessTokenGenerator,
      refreshTokenGenerator,
      comparer,
      logger,
    )
    this.logger = logger.child({ httpController: 'login' })
  }

  async handle(httpRequest: HttpLoginRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { email, password } = httpRequest

    try {
      const { access, authUser } = await this.controller.execute({
        email,
        password,
      })

      const accessDefaultPresenter: AccessDefaultPresenter = {
        access_token: access.access_token,
        refresh_token: access.refresh_token,
      }

      const authUserDefaultPresenter: AuthUserDefaultPresenter = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        birthDate: authUser.birthDate,
        phone: authUser.phone,
        city: authUser.city,
        state: authUser.state,
        country: authUser.country,
        created_at: authUser.created_at,
        updated_at: authUser.updated_at,
      }

      this.logger.logDebug({
        message: 'Auth User Logged',
        data: authUserDefaultPresenter,
      })

      return ok({
        accessToken: accessDefaultPresenter.access_token,
        refreshToken: accessDefaultPresenter.refresh_token,
        authUser: authUserDefaultPresenter,
      })
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof InvalidCredentialsException
      ) {
        return unauthorized(error)
      }

      return serverError(error as Error)
    }
  }
}
