import { ForgotPasswordUsecase } from '@/domains/auth/usecase'
import { ILoggerLocal, ISendForgotPasswordEmail } from '@/shared/protocols'
import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecase/repos'

export interface ForgotPasswordRequest {
  email: string
}

export type ForgotPasswordResponse = void

export class ForgotPasswordController {
  private usecase: ForgotPasswordUsecase
  private logger: ILoggerLocal

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    sendForgotPasswordEmail: ISendForgotPasswordEmail,
    logger: ILoggerLocal,
  ) {
    this.usecase = new ForgotPasswordUsecase(
      getAuthUserByEmailRepository,
      sendForgotPasswordEmail,
      logger,
    )

    this.logger = logger.child({ controller: 'forgot-password' })
  }

  async execute(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request })

    const { email } = request

    await this.usecase.execute({
      email,
    })
  }
}
