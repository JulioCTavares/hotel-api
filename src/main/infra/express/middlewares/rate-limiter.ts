import { NextFunction, Request, Response } from 'express'
import rateLimit, { Options } from 'express-rate-limit'

const handler = (
  _r: Request,
  response: Response,
  _n: NextFunction,
  options: Options,
) => response.status(options.statusCode).json({ mesage: options.message })

export const limiter = rateLimit({
  windowMs: 60000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})
