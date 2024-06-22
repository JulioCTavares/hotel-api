import { adaptRoute } from '@/shared/infra/express/adapters/express-route-adapter'
import { HealthCheckController } from '@/shared/interface/http/controllers/health-check-controller'
import { Router } from 'express'

const healthCheckRouter = Router()

healthCheckRouter
  .route('/health-check')
  .get(adaptRoute(new HealthCheckController()))

export { healthCheckRouter }
