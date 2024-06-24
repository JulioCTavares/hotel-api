import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';


import {
  Hotel,
} from '@/domains/hotel/entities';

export class HotelNotFoundException extends DefaultException {
  constructor(hotel: Partial<Hotel>) {
    super({
      type: ExceptionTypes.USER,
      code: 'HOTEL_NOT_FOUND',
      data: hotel,
    });
  }
}
