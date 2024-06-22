import bcrypt from 'bcrypt'
import { IComparer } from '@/shared/protocols'

export class BCryptCompareAdapter implements IComparer {
  async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
  }
}
