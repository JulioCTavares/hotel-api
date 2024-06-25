import 'jest-ts-auto-mock'
import { createMock } from 'ts-auto-mock'
import { method, On } from 'ts-auto-mock/extension'

import { UserFactory } from '@/tests/domains/user/entities'
import {
  IGetUserByIdRepository,
  IDeleteUserByIdRepository,
} from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { DeleteUserByIdUsecase as UseCase } from '@/domains/user/usecases'
import { pinoLoggerLocal } from '@/main/infra/logs'

const makeSut = () => {
  const getUserByIdRepository = createMock<IGetUserByIdRepository>()
  const getUserByIdRepositorySpy = On(getUserByIdRepository).get(
    method((mock) => mock.getById),
  )

  const deleteUserByIdRepository = createMock<IDeleteUserByIdRepository>()
  const deleteUserByIdRepositorySpy = On(deleteUserByIdRepository).get(
    method((mock) => mock.delete),
  )

  const sut = new UseCase(
    getUserByIdRepository,
    deleteUserByIdRepository,
    pinoLoggerLocal,
  )

  return {
    sut,
    getUserByIdRepositorySpy,
    deleteUserByIdRepositorySpy,
  }
}

describe('Delete User Service', () => {
  describe('With valid parameters', () => {
    it('Should delete a user with success', async () => {
      const { sut, getUserByIdRepositorySpy, deleteUserByIdRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)

      await sut.execute(fakeUser.id)

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(deleteUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('With invalid parameters', () => {
    it('Should not delete user if not exists', async () => {
      const { sut, getUserByIdRepositorySpy, deleteUserByIdRepositorySpy } =
        makeSut()

      const { id } = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(null)

      await expect(sut.execute(id)).rejects.toThrow(UserNotFoundException)

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(deleteUserByIdRepositorySpy).toHaveBeenCalledTimes(0)
    })

    it('Should throw if DeleteUserByIdRepository throws', async () => {
      const { sut, getUserByIdRepositorySpy, deleteUserByIdRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)
      deleteUserByIdRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error())
      })

      await expect(sut.execute(fakeUser.id)).rejects.toThrow()

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(deleteUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
