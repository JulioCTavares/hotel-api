import { DefaultException, ExceptionTypes } from '@/shared/helpers/error-helper'

import { User } from '@/domains/user/entities'

export class UserNotFoundException extends DefaultException {
  constructor(user: Partial<User>) {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_NOT_FOUND',
      data: user,
    })
  }
}
