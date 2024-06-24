import {
  Middleware,
  HttpRequest,
  HttpResponse,
} from '@/shared/interface/http/protocols'
import { AccessTokenValidatorAdapter } from '../../jwt'

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
        return {
          statusCode: 401,
          body: { message: 'Token não fornecido' },
        }
      }

      const authUser = this.accessTokenValidator.validate(access_token)

      if (!authUser) {
        return {
          statusCode: 401,
          body: { message: 'Token inválido' },
        }
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
