import { PrismaClient } from '@prisma/client'
import { User } from '@/domains/user/entities'

import { UserFactory } from '@/tests/domains/user/entities'
import { PrismaUpdateUserRepository } from '@/domains/user/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { env } from '@/config'

const makeSut = () => {
  const sut = new PrismaUpdateUserRepository()

  return {
    sut,
  }
}

describe('Prisma Update User Repository', () => {
  let prismaTest: PrismaClient | null = null
  beforeAll(async () => {
    prismaTest = prismaConnector.connect(env.DATABASE_TEST_URL)
    if (prismaTest) {
      await prismaTest.user.deleteMany({})
    }
  })

  afterEach(async () => {
    if (prismaTest) {
      await prismaTest.user.deleteMany({})
    }
  })

  afterAll(async () => {
    if (prismaTest) {
      await prismaTest.$disconnect()
    }
  })

  test('Should update a user', async () => {
    const { sut } = makeSut()

    const fakeUser = UserFactory.build()

    const paramsToUpdate = UserFactory.build()

    await prismaTest?.user.create({ data: fakeUser })

    const userUpdated = await sut.update({
      ...paramsToUpdate,
      id: fakeUser.id,
    })

    const expectedResult = new User({
      ...paramsToUpdate,
      id: userUpdated.id,
      createdAt: userUpdated.createdAt,
      updatedAt: userUpdated.updatedAt,
    })

    expect(userUpdated).toStrictEqual(expectedResult)
  })
})
