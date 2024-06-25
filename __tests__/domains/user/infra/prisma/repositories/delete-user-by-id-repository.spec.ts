import { PrismaClient } from '@prisma/client'

import { UserFactory } from '@/tests/domains/user/entities'
import { PrismaDeleteUserByIdRepository } from '@/domains/user/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'
import { env } from '@/config'

const makeSut = () => {
  const sut = new PrismaDeleteUserByIdRepository()

  return {
    sut,
  }
}

describe('Prisma delete a User Repository', () => {
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

  it("should delete a user by it's id", async () => {
    const { sut } = makeSut()
    const fakeUser = UserFactory.build()

    const userCreated = await prismaTest?.user.create({
      data: fakeUser,
    })

    if (!userCreated) throw new Error('User not created')

    await sut.delete(userCreated.id || '')

    const usersInDataBase = await prismaTest?.user.count()

    expect(usersInDataBase).toBe(0)
  })
})
