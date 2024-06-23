import swaggerConfig from '@/main/infra/swagger'
import { noCache } from '@/main/infra/express/middlewares'

import { serve, setup } from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig))
  app.get('/', (_req: Request, res: Response) => res.redirect('/docs'))
}
