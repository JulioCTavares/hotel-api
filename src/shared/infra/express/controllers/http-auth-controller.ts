import {
  Middleware,
  HttpRequest,
  HttpResponse,
} from '@/shared/interface/http/protocols'
import { AccessTokenValidatorAdapter } from '../../jwt'
import { UnauthorizedException } from '@/domains/auth/usecase/exceptions'

class HttpGetAuthUserByTokenController implements Middleware {
  private readonly accessTokenValidator: AccessTokenValidatorAdapter

  constructor(accessTokenValidator: AccessTokenValidatorAdapter) {
    this.accessTokenValidator = accessTokenValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authHeader = httpRequest.headers.authorization
      const access_token =
        authHeader && authHeader.startsWith('Bearer ')
          ? authHeader.split(' ')[1]
          : null

      if (!access_token) {
        throw new UnauthorizedException()
      }

      const authUser = this.accessTokenValidator.validate(access_token)

      if (!authUser) {
        throw new UnauthorizedException('Invalid token')
      }

      return {
        statusCode: 200,
        body: authUser,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Erro no servidor' },
      }
    }
  }
}

export const makeHttpGetAuthUserByTokenController = (): Middleware => {
  const accessTokenValidator = new AccessTokenValidatorAdapter()
  return new HttpGetAuthUserByTokenController(accessTokenValidator)
}
