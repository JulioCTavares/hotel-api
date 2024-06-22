import crypto from 'node:crypto'

import { IUuidGenerator } from '@/shared/protocols'

export class UUIDGeneratorAdapter implements IUuidGenerator {
  generate(): string {
    return crypto.randomUUID()
  }
}
