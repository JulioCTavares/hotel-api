import bcrypt from 'bcrypt'
import { IHasher } from '@/shared/protocols'

export class BCryptHasherAdapter implements IHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  }
}
