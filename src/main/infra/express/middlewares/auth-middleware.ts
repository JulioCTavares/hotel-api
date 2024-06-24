import { adaptMiddleware } from '@/shared/infra/express/adapters'
import { makeHttpGetAuthUserByTokenController } from '@/shared/infra/express/controllers/http-auth-controller'

export const authMiddleware = () => {
  return adaptMiddleware(makeHttpGetAuthUserByTokenController())
}
