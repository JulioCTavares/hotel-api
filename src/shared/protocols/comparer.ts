export interface IComparer {
  compare(password: string, hash: string): Promise<boolean>
}
