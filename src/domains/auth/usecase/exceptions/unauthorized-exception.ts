import { DefaultException, ExceptionTypes } from '@/shared/helpers'

export class UnauthorizedException extends DefaultException {
  constructor(message?: string) {
    super({
      type: ExceptionTypes.SECURITY,
      code: 'UNAUTHORIZED',
      message: message || 'Unauthorized: Access denied',
    })
  }
}
