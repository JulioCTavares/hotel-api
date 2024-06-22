import { Router } from 'express'

import {
  makeHttpCreateUserController,
  makeHttpGetUserByIdController,
  makeHttpGetUsersByFilterController,
} from '@/domains/user/factories'
import { adaptRoute } from '@/shared/infra/express/adapters/express-route-adapter'

const userRouter = Router()

userRouter
  .route('/users')
  .post(adaptRoute(makeHttpCreateUserController()))
  .get(adaptRoute(makeHttpGetUsersByFilterController()))

userRouter.route('/users/:id').get(adaptRoute(makeHttpGetUserByIdController()))

export { userRouter }
