export type HotelConstructorParams = {
  id: string
  name: string
  city: string
  state: string
  country: string
  createdAt?: Date
  updatedAt?: Date
}

export class Hotel {
  id: string
  name: string
  city: string
  state: string
  country: string
  createdAt?: Date
  updatedAt?: Date

  constructor(hotelParams: HotelConstructorParams) {
    const { id, name, city, state, country, createdAt, updatedAt } = hotelParams

    this.id = id
    this.name = name
    this.city = city
    this.state = state
    this.country = country
    this.createdAt = createdAt
    this.updatedAt = updatedAt

    Object.freeze(this)
  }
}
