import { Hotel } from '@/domains/hotel/entities';
import {
  HotelDefaultPresenter,
} from '@/domains/hotel/interface/presenters';

export class HotelTransformers {
  static generateDefaultPresenter(hotel: Hotel): HotelDefaultPresenter {
    return {
      id: hotel.id,
      name: hotel.name,
      created_at: hotel.createdAt,
      updated_at: hotel.updatedAt,

      // association
      // inclusion_name: hotel.entityIncluded,
    };
  }
}
