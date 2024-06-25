import { PrismaGetUsersByFilterRepository } from '@/domains/user/infra/prisma'

import { PrismaClient } from '@prisma/client'
import { UserFactory } from '@/tests/domains/user/entities'
import { OrderByFilter, Pagination } from '@/shared/helpers'
import { prismaConnector } from '@/main/infra/prisma'
import { env } from '@/config'

const makeSut = () => {
  const sut = new PrismaGetUsersByFilterRepository()

  return {
    sut,
  }
}

describe('Prisma Get Users by Filter Repository', () => {
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

  it('should list users', async () => {
    const { sut } = makeSut()

    await prismaTest?.user.create({ data: { ...UserFactory.build() } })
    await prismaTest?.user.create({ data: { ...UserFactory.build() } })
    await prismaTest?.user.create({ data: { ...UserFactory.build() } })

    const users = await sut.get({
      filters: {},
      pagination: new Pagination({}),
      orderBy: new OrderByFilter({}),
    })

    expect(users).toHaveLength(3)
  })

  it('should return empty array if there no users in database', async () => {
    const { sut } = makeSut()

    const users = await sut.get({
      filters: {},
      pagination: new Pagination({}),
      orderBy: new OrderByFilter({}),
    })

    expect(users).toHaveLength(0)
  })

  it('should filter users like a elastic search', async () => {
    const { sut } = makeSut()

    for (const name of ['ABCDE', 'abce', 'abcd']) {
      await prismaTest?.user.create({
        data: {
          ...UserFactory.build({
            name,
          }),
        },
      })
    }

    const usersInDataBase = await prismaTest?.user.count({})
    expect(usersInDataBase).toBe(3)

    const fakeParams = {
      filters: {},
      pagination: new Pagination({}),
      orderBy: new OrderByFilter({}),
    }

    const users = await sut.get({
      ...fakeParams,
      filters: { city: 'abc' },
    })
    expect(users).toHaveLength(3)

    const users2 = await sut.get({
      ...fakeParams,
      filters: { city: 'abcd' },
    })
    expect(users2).toHaveLength(2)
  })

  it('should paginate users', async () => {
    const { sut } = makeSut()

    const fakeUsers = UserFactory.buildList(10)

    await prismaTest?.user.createMany({
      data: fakeUsers,
    })

    const usersInDataBase = await prismaTest?.user.count()
    expect(usersInDataBase).toBe(10)

    const fakeParams = {
      filters: {},
      pagination: new Pagination({}),
      orderBy: new OrderByFilter({}),
    }

    const users = await sut.get(fakeParams)
    expect(users).toHaveLength(10)

    const users2 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 5, skip: 5 }),
    })
    expect(users2).toHaveLength(5)

    const users3 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 1, skip: 10 }),
    })
    expect(users3).toHaveLength(0)

    const users4 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 0, skip: 10 }),
    })
    expect(users4).toHaveLength(0)

    const users5 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 10, skip: 0 }),
    })
    expect(users5).toHaveLength(10)

    const users6 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 10, skip: 8 }),
    })
    expect(users6).toHaveLength(2)
  })
})
