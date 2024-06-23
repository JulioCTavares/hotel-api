import { NextFunction, Request, Response } from 'express'

export const responseMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { response: httpResponse } = res.locals

  if (!httpResponse?.statusCode) {
    return res.sendStatus(404)
  }

  if (httpResponse?.statusCode >= 200 && httpResponse?.statusCode <= 299) {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }

  return next(httpResponse)
}
