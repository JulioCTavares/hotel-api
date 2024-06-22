import { DefaultException, ExceptionTypes } from '@/shared/helpers/error-helper'

import { User } from '@/domains/user/entities'

export class UserAlreadyExistsException extends DefaultException {
  constructor(user: Partial<User>) {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_ALREADY_EXISTS',
      data: user,
    })
  }
}
