import { env } from '@/config'
import { PrismaCountUsersByFilterRepository } from '@/domains/user/infra/prisma'
import { prismaConnector } from '@/main/infra/prisma'

import { UserFactory } from '@/tests/domains/user/entities'
import { PrismaClient } from '@prisma/client'

const makeSut = () => {
  const sut = new PrismaCountUsersByFilterRepository()

  return {
    sut,
  }
}

describe('Prisma Count Users By Filters Repository', () => {
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

  it('should count users by filter', async () => {
    const { sut } = makeSut()

    for (const name of ['ABCDE', 'abce', 'abcd']) {
      const fakeUser = UserFactory.build({
        name,
      })

      await prismaTest?.user.create({
        data: {
          ...fakeUser,
        },
      })
    }

    const users = await sut.count({
      name: 'abc',
    })
    expect(users).toBe(3)

    const users2 = await sut.count({
      name: 'abcd',
    })
    expect(users2).toBe(2)
  })
})
