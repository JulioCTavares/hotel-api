// Uncomment the next lines if you need
/*
* import {
*   EntityIncludedIntoHotel,
* } from '@/domains/hotel/entities';
*/

export type HotelConstructorParams = {
  id: string;
  name: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // association
  // inclusionName: Array<EntityIncludedIntoHotel>;
}

export class Hotel {
  id: string;
  name: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // association
  // inclusionName: Array<EntityIncludedIntoHotel>;

  constructor(hotelParams: HotelConstructorParams) {
    const {
      id,
      name,
      enabled,
      createdAt,
      updatedAt,

      // association
      // inclusionName,
    } = hotelParams;

    this.id = id;
    this.name = name;
    this.enabled = enabled ?? true;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    // this.inclusionName = inclusionName;

    Object.freeze(this);
  }
}
