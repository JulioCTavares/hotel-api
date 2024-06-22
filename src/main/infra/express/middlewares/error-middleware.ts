import { DefaultException } from '@/shared/helpers'
import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const status = error?.statusCode || 500

  if (error.body instanceof DefaultException) {
    res.status(status).json({
      type: error.body?.type,
      code: error.body?.code,
      data: error.body?.data?.message,
      message: error.body?.data,
    })

    return
  }

  if (error.body) {
    res.status(status).json({
      type: error.body?.type,
      code: error.body?.code,
      data: error.body?.name,
      message: error.body?.stack,
    })

    return
  }

  if (status === 500) {
    sentryLoggerCloud.logError(error)
  }

  res.status(status).json({
    type: ExceptionTypes.UNKNOWN,
    code: '1',
    data: error.stack,
    message: error.message,
  })
}
