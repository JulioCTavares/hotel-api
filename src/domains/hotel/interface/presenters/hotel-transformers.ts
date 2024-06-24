import { Hotel } from '@/domains/hotel/entities'
import { HotelDefaultPresenter } from '@/domains/hotel/interface/presenters'

export class HotelTransformers {
  static generateDefaultPresenter(hotel: Hotel): HotelDefaultPresenter {
    return {
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      state: hotel.state,
      created_at: hotel.createdAt,
      updated_at: hotel.updatedAt,
    }
  }
}
