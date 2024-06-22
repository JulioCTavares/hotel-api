export enum ExceptionTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
  UNKNOWN = 'UNKNOW',
}

export interface Exception {
  type: ExceptionTypes
  code: string
  data?: any
  message?: string
}

export class DefaultException extends Error implements Exception {
  type: ExceptionTypes
  code: string
  data?: any

  constructor(exception: Exception) {
    super(exception.message)
    this.code = exception.code
    this.type = exception.type
    this.data = exception.data
  }
}
