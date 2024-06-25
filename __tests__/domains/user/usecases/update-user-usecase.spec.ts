import 'jest-ts-auto-mock'
import { createMock } from 'ts-auto-mock'
import { method, On } from 'ts-auto-mock/extension'

import { UserFactory } from '@/tests/domains/user/entities'
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos'
import { UserNotFoundException } from '@/domains/user/usecases/exceptions'
import { UpdateUserByIdUsecase as UseCase } from '@/domains/user/usecases'
import { pinoLoggerLocal } from '@/main/infra/logs'

const makeSut = () => {
  const getUserByIdRepository = createMock<IGetUserByIdRepository>()
  const getUserByIdRepositorySpy = On(getUserByIdRepository).get(
    method((mock) => mock.getById),
  )

  const updateUserByIdRepository = createMock<IUpdateUserRepository>()
  const updateUserByIdRepositorySpy = On(updateUserByIdRepository).get(
    method((mock) => mock.update),
  )

  const sut = new UseCase(
    getUserByIdRepository,
    updateUserByIdRepository,
    pinoLoggerLocal,
  )

  return {
    sut,
    getUserByIdRepositorySpy,
    updateUserByIdRepositorySpy,
  }
}

describe('Update User Service', () => {
  describe('With valid parameters', () => {
    it('Should update a user successfully', async () => {
      const { sut, getUserByIdRepositorySpy, updateUserByIdRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()
      const fakeUserUpdate = UserFactory.build()

      const { id, ...paramsToUpdate } = fakeUserUpdate

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)
      updateUserByIdRepositorySpy.mockResolvedValueOnce(fakeUserUpdate)

      const userUpdated = await sut.execute({ id: fakeUser.id, paramsToUpdate })

      expect(userUpdated).toStrictEqual(fakeUserUpdate)
      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(updateUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('With invalid parameters', () => {
    it('Should not update user if user does not exist', async () => {
      const { sut, getUserByIdRepositorySpy, updateUserByIdRepositorySpy } =
        makeSut()

      const { id, ...paramsToUpdate } = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(null)

      const testScript = () => sut.execute({ id, paramsToUpdate })

      await expect(testScript).rejects.toThrow(UserNotFoundException)

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(updateUserByIdRepositorySpy).toHaveBeenCalledTimes(0)
    })

    it('Should throw if updateUserByIdRepository throws', async () => {
      const { sut, getUserByIdRepositorySpy, updateUserByIdRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()
      const { id, ...paramsToUpdate } = UserFactory.build()

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser)
      updateUserByIdRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error())
      })

      const testScript = () => sut.execute({ id: fakeUser.id, paramsToUpdate })

      await expect(testScript).rejects.toThrow()

      expect(getUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
      expect(updateUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
