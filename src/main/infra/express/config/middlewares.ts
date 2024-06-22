import { Express } from 'express'
import {
  helmetMiddleware,
  bodyParser,
  corsMiddleware,
  limiter,
} from '@/main/infra/express/middlewares'

export default (app: Express): void => {
  app.use(helmetMiddleware)
  app.use(bodyParser)
  app.use(corsMiddleware)
  app.use(limiter)
}
