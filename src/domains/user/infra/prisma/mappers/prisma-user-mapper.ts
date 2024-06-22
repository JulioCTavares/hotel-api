import { User as PrismaUser } from '@prisma/client'

import { User } from '@/domains/user/entities'

export class PrismaUserMapper {
  static toDomain(userDTO: PrismaUser): User {
    return new User({
      id: userDTO.id,
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
      birthDate: userDTO.birthDate !== null ? userDTO.birthDate : undefined,
      phone: userDTO.phone !== null ? userDTO.phone : undefined,
      city: userDTO.city !== null ? userDTO.city : undefined,
      state: userDTO.state !== null ? userDTO.state : undefined,
      createdAt: userDTO.createdAt,
      updatedAt: userDTO.updatedAt,
    })
  }
}
