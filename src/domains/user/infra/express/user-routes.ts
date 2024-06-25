import { Router } from 'express'

import {
  makeHttpCreateUserController,
  makeHttpDeleteUserByIdController,
  makeHttpGetUserByIdController,
  makeHttpGetUsersByFilterController,
  makeHttpUpdateUserByIdController,
} from '@/domains/user/factories'
import { adaptRoute } from '@/shared/infra/express/adapters/express-route-adapter'
import { authMiddleware } from '@/main/infra/express/middlewares'

const userRouter = Router()

userRouter
  .route('/users')
  .post(adaptRoute(makeHttpCreateUserController()))
  .get(
    authMiddleware(['ADMIN']),
    adaptRoute(makeHttpGetUsersByFilterController()),
  )

userRouter
  .route('/users/:id')
  .get(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpGetUserByIdController()),
  )
  .patch(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpUpdateUserByIdController()),
  )
  .delete(
    authMiddleware(['ADMIN', 'USER']),
    adaptRoute(makeHttpDeleteUserByIdController()),
  )

export { userRouter }
