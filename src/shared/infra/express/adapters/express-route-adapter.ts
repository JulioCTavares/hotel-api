import { HttpController } from '@/shared/interface/http/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptRoute = (controller: HttpController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      // @ts-expect-error
      userRequester: req.userRequester || null,
      ...req.body,
    }

    const httpResponse = await controller.handle(httpRequest)

    res.locals.response = httpResponse

    next()
  }
}
