import { PrismaGetAuthUserByEmailRepository } from '@/domains/auth/infra/prisma'
import { HttpForgotPasswordController } from '@/domains/auth/interface/http'
import { pinoLoggerLocal } from '@/main/infra/logs'
import { SendGridForgotPasswordEmail } from '@/shared/infra/sendgrid'

export const makeHttpForgotPasswordController =
  (): HttpForgotPasswordController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository()
    const sendForgotPasswordEmailGateway = new SendGridForgotPasswordEmail()
    const loggerLocal = pinoLoggerLocal

    return new HttpForgotPasswordController(
      getAuthUserByEmailRepository,
      sendForgotPasswordEmailGateway,
      loggerLocal,
    )
  }
