import { DefaultException, ExceptionTypes } from '@/shared/helpers/error-helper'

export class ValidationException extends DefaultException {
  constructor(validation: any) {
    super({
      type: ExceptionTypes.USER,
      code: 'VALIDATION',
      data: validation,
    })
  }
}
