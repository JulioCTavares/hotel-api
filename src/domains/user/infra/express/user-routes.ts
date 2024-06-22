import { Router } from 'express'

import { makeHttpCreateUserController } from '@/domains/user/factories'
import { adaptRoute } from '@/shared/infra/express/adapters/express-route-adapter'

const userRouter = Router()

userRouter.route('/users').post(adaptRoute(makeHttpCreateUserController()))

export { userRouter }
