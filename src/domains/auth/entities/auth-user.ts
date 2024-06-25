import { UserRoles } from '@/domains/user/entities'

export type AuthUserType = {
  id: string
  email: string
  name: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  role: UserRoles
  country?: string
  createdAt?: Date
  updatedAt?: Date
}

export class AuthUser {
  id: string
  email: string
  name: string
  birthDate?: Date
  phone?: string
  city?: string
  state?: string
  role: UserRoles
  country?: string
  createdAt?: Date
  updatedAt?: Date

  constructor(params: AuthUserType) {
    const {
      id,
      email,
      name,
      birthDate,
      phone,
      city,
      role,
      country,
      createdAt,
      state,
      updatedAt,
    } = params

    this.id = id
    this.email = email
    this.name = name
    this.birthDate = birthDate
    this.phone = phone
    this.city = city
    this.role = role
    this.state = state
    this.country = country
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
