import { PrismaClient } from '@prisma/client'
import prismaEnviroment from './prisma-enviroment'

class PrismaConnector {
  private readonly url: string = prismaEnviroment
  client: null | PrismaClient = null

  connect(url?: string): PrismaClient {
    if (this.client !== null) {
      return this.client
    }

    this.client = new PrismaClient({
      datasources: {
        db: {
          url: url || this.url,
        },
      },
    })

    return this.client
  }

  async disconnect(): Promise<void> {
    if (this.client !== null) {
      await this.client.$disconnect()
    }
  }
}

const prismaConnector = new PrismaConnector()

export { prismaConnector }
