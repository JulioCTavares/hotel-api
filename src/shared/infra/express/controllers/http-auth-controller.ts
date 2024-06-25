import {
  Middleware,
  HttpRequest,
  HttpResponse,
} from '@/shared/interface/http/protocols'
import { AccessTokenValidatorAdapter } from '../../jwt'
import { UnauthorizedException } from '@/domains/auth/usecase/exceptions'
import {
  forbidden,
  serverError,
  unauthorized,
} from '@/shared/interface/http/helpers'

class HttpGetAuthUserByTokenController implements Middleware {
  private readonly accessTokenValidator: AccessTokenValidatorAdapter
  private readonly roles: ('ADMIN' | 'USER')[]

  constructor(
    accessTokenValidator: AccessTokenValidatorAdapter,
    roles: ('ADMIN' | 'USER')[],
  ) {
    this.accessTokenValidator = accessTokenValidator
    this.roles = roles
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authHeader = httpRequest.headers.authorization
      const access_token =
        authHeader && authHeader.startsWith('Bearer ')
          ? authHeader.split(' ')[1]
          : null

      if (!access_token) {
        return unauthorized()
      }

      const authUser = this.accessTokenValidator.validate(access_token)

      if (!authUser) {
        return unauthorized('Invalid token')
      }

      if (!this.roles.includes(authUser.role)) {
        return forbidden('Access Denied')
      }

      return {
        statusCode: 200,
        body: authUser,
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return unauthorized()
      }
      return serverError(error as Error)
    }
  }
}

export const makeHttpGetAuthUserByTokenController = (
  roles: ('ADMIN' | 'USER')[],
): Middleware => {
  const accessTokenValidator = new AccessTokenValidatorAdapter()
  return new HttpGetAuthUserByTokenController(accessTokenValidator, roles)
}
