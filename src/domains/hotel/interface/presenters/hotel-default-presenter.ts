// Uncomment the next lines if you need
/*
* import {
*   EntityIncludedIntoHotel,
* } from '@/domains/hotel/entities';
*/

export interface HotelDefaultPresenter {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;

  // association
  // entity_included?: Array<EntityIncludedIntoHotel>;
}
