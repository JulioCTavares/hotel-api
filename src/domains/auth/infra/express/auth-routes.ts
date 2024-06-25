import { adaptRoute } from '@/shared/infra/express/adapters'

import { Router } from 'express'

import {
  makeHttpForgotPasswordController,
  makeHttpLoginController,
} from '@/domains/auth/factories'

const authRouter = Router()

authRouter.route('/auth/login').post(adaptRoute(makeHttpLoginController()))
authRouter
  .route('/auth/forgot-password')
  .post(adaptRoute(makeHttpForgotPasswordController()))

export { authRouter }
