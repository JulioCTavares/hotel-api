import { ILoggerLocal, ISendForgotPasswordEmail } from '@/shared/protocols'
import { IGetAuthUserByEmailRepository } from './repos'
import { AuthUserNotFoundException } from './exceptions'

export interface IForgotPasswordUsecase {
  execute(
    params: IForgotPasswordUsecase.Params,
  ): Promise<IForgotPasswordUsecase.Response>
}

export namespace IForgotPasswordUsecase {
  export type Params = { email: string }
  export type Response = void
}

export class ForgotPasswordUsecase implements IForgotPasswordUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly sendForgotPasswordEmailGateway: ISendForgotPasswordEmail,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'forgot-password' })
  }

  async execute(
    forgotParams: IForgotPasswordUsecase.Params,
  ): Promise<IForgotPasswordUsecase.Response> {
    this.logger.logDebug({ message: 'Request Received', data: forgotParams })

    const { email } = forgotParams

    const authUserFound =
      await this.getAuthUserByEmailRepository.getByEmail(email)

    if (!authUserFound) {
      throw new AuthUserNotFoundException()
    }

    this.logger.logDebug({ message: 'Auth user found', data: authUserFound })

    await this.sendForgotPasswordEmailGateway.send({ email })

    this.logger.logDebug({
      message: 'Auth User forgot password email sent',
      data: email,
    })
  }
}
