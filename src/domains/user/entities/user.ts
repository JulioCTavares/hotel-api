export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type UserType = {
  id: string
  name: string
  email: string
  password: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  role: UserRoles
  country?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  id: string
  name: string
  email: string
  password: string
  birthDate?: Date
  phone?: string
  city?: string
  role: UserRoles
  state?: string
  country?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(user: UserType) {
    const {
      id,
      email,
      password,
      name,
      birthDate,
      city,
      country,
      createdAt,
      phone,
      role,
      state,
      updatedAt,
    } = user

    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.birthDate = birthDate
    this.phone = phone
    this.city = city
    this.state = state
    this.country = country
    this.role = role
    this.createdAt = createdAt
    this.updatedAt = updatedAt

    Object.freeze(this)
  }
}
