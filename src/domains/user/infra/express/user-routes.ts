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
  .get(authMiddleware(), adaptRoute(makeHttpGetUsersByFilterController()))

userRouter
  .route('/users/:id')
  .get(authMiddleware(), adaptRoute(makeHttpGetUserByIdController()))
  .patch(authMiddleware(), adaptRoute(makeHttpUpdateUserByIdController()))
  .delete(authMiddleware(), adaptRoute(makeHttpDeleteUserByIdController()))

export { userRouter }
