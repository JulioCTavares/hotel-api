import { DefaultException, ExceptionTypes } from '@/shared/helpers'

export class InvalidCredentialsException extends DefaultException {
  constructor() {
    super({
      type: ExceptionTypes.USER,
      code: 'INVALID_CREDENTIALS',
      message: 'Email or password is incorrect',
    })
  }
}
