import { DefaultException, ExceptionTypes } from '@/shared/helpers/error-helper'

export class PrismaException extends DefaultException {
  constructor(error: any) {
    super({
      type: ExceptionTypes.SYSTEM,
      code: 'PRISMA',
      data: error,
    })
  }
}
