import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecase/repos'
import { AuthUserNotFoundException } from '@/domains/auth/usecase/exceptions'
import { ForgotPasswordController } from '@/domains/auth/interface/controllers'

import { HttpController, HttpResponse } from '@/shared/interface/http/protocols'
import { ILoggerLocal, ISendForgotPasswordEmail } from '@/shared/protocols'
import { ValidationException } from '@/shared/helpers'
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers'

export interface HttpForgotPasswordRequest {
  email: string
}

export class HttpForgotPasswordController implements HttpController {
  private controller: ForgotPasswordController
  private logger: ILoggerLocal

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    sendForgotPasswordEmail: ISendForgotPasswordEmail,
    logger: ILoggerLocal,
  ) {
    this.controller = new ForgotPasswordController(
      getAuthUserByEmailRepository,
      sendForgotPasswordEmail,
      logger,
    )

    this.logger = logger.child({ httpController: 'forgot-password' })
  }

  async handle(httpRequest: HttpForgotPasswordRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest })

    const { email } = httpRequest

    try {
      await this.controller.execute({ email })

      this.logger.logDebug({
        message: 'Auth User forgot password',
        data: email,
      })

      return ok()
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException
      ) {
        return badRequest(error)
      }

      return serverError(error as Error)
    }
  }
}
