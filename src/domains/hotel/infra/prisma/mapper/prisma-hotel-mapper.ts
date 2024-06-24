import { Hotel } from '@/domains/hotel/entities'
import { Hotel as PrismaHotel } from '@prisma/client'

export class PrismaHotelMapper {
  static toDomain(hotelDTO: PrismaHotel): Hotel {
    return new Hotel({
      id: hotelDTO.id,
      name: hotelDTO.name,
      city: hotelDTO.city,
      state: hotelDTO.state,
      country: hotelDTO.country,
      createdAt: hotelDTO.createdAt,
      updatedAt: hotelDTO.updatedAt,
    })
  }
}
