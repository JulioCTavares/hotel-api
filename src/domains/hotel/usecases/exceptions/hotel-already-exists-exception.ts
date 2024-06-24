import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import {
  Hotel,
} from '@/domains/hotel/entities';

export class HotelAlreadyExistsException extends DefaultException {
  constructor(hotel: Partial<Hotel>) {
    super({
      type: ExceptionTypes.USER,
      code: 'HOTEL_ALREADY_EXISTS',
      data: hotel,
    });
  }
}
