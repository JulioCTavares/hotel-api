export interface PaginationType {
  take?: number
  skip?: number
}

export class Pagination {
  take: number
  skip: number

  constructor({ take, skip }: PaginationType) {
    this.take = take ?? 10
    this.skip = skip ?? 0
  }

  generate() {
    return {
      take: this.take,
      skip: this.skip,
    }
  }
}
