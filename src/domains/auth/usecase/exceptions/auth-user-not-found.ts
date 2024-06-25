import { DefaultException, ExceptionTypes } from '@/shared/helpers'

export class AuthUserNotFoundException extends DefaultException {
  constructor() {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_NOT_FOUND',
      message: 'user not found',
    })
  }
}
