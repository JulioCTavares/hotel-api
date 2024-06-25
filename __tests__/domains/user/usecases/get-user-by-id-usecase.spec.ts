import 'jest-ts-auto-mock'
import { createMock } from 'ts-auto-mock'
import { method, On } from 'ts-auto-mock/extension'

import { UserFactory } from '@/tests/domains/user/entities'
import { IGetUserByIdRepository } from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { GetUserByIdUsecase as UseCase } from '@/domains/user/usecases'
import { pinoLoggerLocal } from '@/main/infra/logs'

const makeSut = () => {
  const getUserByIdRepository = createMock<IGetUserByIdRepository>()
  const getUserByIdRepositorySpy = On(getUserByIdRepository).get(
    method((mock) => mock.getById),
  )

  const sut = new UseCase(getUserByIdRepository, pinoLoggerLocal)

  return {
    sut,
    getUserByIdRepositorySpy,
  }
}

describe('Get User By Id Service', () => {
  describe('With valid parameters', () => {
    it('Should get a user by id with success', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()

      const fakeUser = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)

      const result = await sut.execute(fakeUser.id)

      expect(result).toEqual(fakeUser)
      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })

    it('Should return null if user not found', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()

      const fakeUser = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(null)

      await expect(sut.execute(fakeUser.id)).rejects.toThrow(
        UserNotFoundException,
      )

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('With invalid parameters', () => {
    it('Should throw if GetUserByIdRepository throws', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()

      const fakeUser = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)
      getUserByIdRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error())
      })

      await expect(sut.execute(fakeUser.id)).rejects.toThrow()

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
