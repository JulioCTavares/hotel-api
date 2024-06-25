import { env } from '@/config'
import { ISendForgotPasswordEmail } from '@/shared/protocols'
import sgMail from '@sendgrid/mail'

export class SendGridForgotPasswordEmail implements ISendForgotPasswordEmail {
  constructor() {
    const sendGridApiKey = env.SENDGRID_API_KEY
    sgMail.setApiKey(sendGridApiKey)
  }

  async send(params: ISendForgotPasswordEmail.Params): Promise<void> {
    const { email } = params
    const msg = {
      to: email,
      from: env.SENDGRID_EMAIl,
      subject: 'Password Reset Request',
      text: 'You requested a password reset. Please follow the instructions...',
      html: '<strong>You requested a password reset. Please follow the instructions...</strong>',
    }

    await sgMail.send(msg)
  }
}
