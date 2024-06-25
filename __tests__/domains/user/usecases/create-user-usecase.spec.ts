import 'jest-ts-auto-mock'
import { On, method } from 'ts-auto-mock/extension'
import { UserFactory } from '@/tests/domains/user/entities'

import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions'
import { CreateUserUsecase as UseCase } from '@/domains/user/usecases'
import { UUIDGeneratorAdapter } from '@/shared/infra/uuid'
import { pinoLoggerLocal } from '@/main/infra/logs'
import {
  PrismaSaveUserRepository,
  PrismaGetUserByEmailRepository,
} from '@/domains/user/infra/prisma'
import { BCryptHasherAdapter } from '@/shared/infra/bcrypt/hash'

const makeSut = () => {
  const uuidGenerator = new UUIDGeneratorAdapter()
  const hasher = new BCryptHasherAdapter()

  const getUserByEmailRepository = new PrismaGetUserByEmailRepository()
  const getUserByEmailRepositorySpy = On(getUserByEmailRepository).get(
    method('getByEmail'),
  )

  const saveUserRepository = new PrismaSaveUserRepository()
  const saveUserRepositorySpy = On(saveUserRepository).get(method('save'))

  const sut = new UseCase(
    getUserByEmailRepository,
    uuidGenerator,
    hasher,
    saveUserRepository,
    pinoLoggerLocal,
  )

  return {
    sut,
    getUserByEmailRepositorySpy,
    saveUserRepositorySpy,
  }
}

describe('Create User Use Case', () => {
  describe('With valid parameters', () => {
    it('should create a new user successfully', async () => {
      const { sut, getUserByEmailRepositorySpy, saveUserRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null)
      saveUserRepositorySpy.mockResolvedValueOnce(fakeUser)

      const userCreated = await sut.execute(fakeUser)

      expect(userCreated).toEqual(fakeUser)
      expect(getUserByEmailRepositorySpy).toHaveBeenCalledTimes(1)
      expect(saveUserRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('With invalid parameters', () => {
    it('should throw UserAlreadyExistsException if user already exists', async () => {
      const { sut, getUserByEmailRepositorySpy, saveUserRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()

      getUserByEmailRepositorySpy.mockResolvedValueOnce(fakeUser)

      await expect(sut.execute(fakeUser)).rejects.toThrow(
        UserAlreadyExistsException,
      )

      expect(getUserByEmailRepositorySpy).toHaveBeenCalledTimes(1)
      expect(saveUserRepositorySpy).not.toHaveBeenCalled()
    })

    it('should throw error if SaveUserRepository throws', async () => {
      const { sut, getUserByEmailRepositorySpy, saveUserRepositorySpy } =
        makeSut()

      const fakeUser = UserFactory.build()

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null)
      saveUserRepositorySpy.mockRejectedValueOnce(new Error('Save failed'))

      await expect(sut.execute(fakeUser)).rejects.toThrow(Error)

      expect(getUserByEmailRepositorySpy).toHaveBeenCalledTimes(1)
      expect(saveUserRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
