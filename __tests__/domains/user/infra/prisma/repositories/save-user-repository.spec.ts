import { PrismaClient } from '@prisma/client'
import { User } from '@/domains/user/entities'

import { UserFactory } from '@/tests/domains/user/entities'
import { PrismaSaveUserRepository } from '@/domains/user/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { env } from '@/config'

const makeSut = () => {
  const sut = new PrismaSaveUserRepository()

  return {
    sut,
  }
}

describe('Prisma Save User Repository', () => {
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

  it('should create a user', async () => {
    const { sut } = makeSut()

    const fakeUser = UserFactory.build()

    const userCreated = await sut.save(fakeUser)

    const expectedResult = new User({
      ...fakeUser,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    })

    expect(userCreated).toStrictEqual(expectedResult)
  })
})
