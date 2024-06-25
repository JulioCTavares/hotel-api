import 'jest-ts-auto-mock'
import { createMock } from 'ts-auto-mock'
import { method, On } from 'ts-auto-mock/extension'

import { UserFactory } from '@/tests/domains/user/entities'
import {
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user/usecases/repos'
import { GetUsersByFilterUsecase as UseCase } from '@/domains/user/usecases'
import { OrderByFilter, Pagination } from '@/shared/helpers'
import { pinoLoggerLocal } from '@/main/infra/logs'

const makeSut = () => {
  const getUsersByFilterRepository = createMock<IGetUsersByFilterRepository>()
  const getUsersByFilterRepositorySpy = On(getUsersByFilterRepository).get(
    method((mock) => mock.get),
  )

  const countUsersByFilterRepository =
    createMock<ICountUsersByFilterRepository>()
  const countUsersByFilterRepositorySpy = On(countUsersByFilterRepository).get(
    method((mock) => mock.count),
  )

  const sut = new UseCase(
    getUsersByFilterRepository,
    countUsersByFilterRepository,
    pinoLoggerLocal,
  )

  return {
    sut,
    getUsersByFilterRepositorySpy,
    countUsersByFilterRepositorySpy,
  }
}

describe('Get User By Filters Service', () => {
  describe('With valid parameters', () => {
    it('Should get users by filters with success', async () => {
      const {
        sut,
        getUsersByFilterRepositorySpy,
        countUsersByFilterRepositorySpy,
      } = makeSut()

      const fakeUsers = UserFactory.buildList(8)

      getUsersByFilterRepositorySpy.mockResolvedValueOnce(fakeUsers)
      countUsersByFilterRepositorySpy.mockResolvedValueOnce(fakeUsers.length)

      const users = await sut.execute({
        filters: {},
        orderBy: new OrderByFilter({}),
        pagination: new Pagination({}),
      })

      expect(users.users).toStrictEqual(fakeUsers)
      expect(users.totalUsers).toEqual(fakeUsers.length)
      expect(getUsersByFilterRepositorySpy).toHaveBeenCalledTimes(1)
      expect(countUsersByFilterRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
