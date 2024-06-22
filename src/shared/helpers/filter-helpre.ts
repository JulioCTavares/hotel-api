export type DateFilter = { initialDate?: Date; finalDate?: Date }

export enum OrderByMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface OrderByFilterType {
  property?: string
  mode?: OrderByMode
}

export class OrderByFilter {
  property: string
  mode: OrderByMode

  constructor(orderByFilter: OrderByFilterType) {
    this.property = orderByFilter?.property ?? 'createdAt'
    this.mode = orderByFilter?.mode ?? OrderByMode.DESC
  }

  generate() {
    return {
      property: this.property,
      mode: this.mode,
    }
  }
}
