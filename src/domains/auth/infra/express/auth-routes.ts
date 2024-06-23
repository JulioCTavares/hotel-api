import { adaptRoute } from '@/shared/infra/express/adapters'

import { Router } from 'express'

import { makeHttpLoginController } from '@/domains/auth/factories'

const authRouter = Router()

authRouter.route('/auth/login').post(adaptRoute(makeHttpLoginController()))

export { authRouter }
