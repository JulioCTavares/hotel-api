import { Hotel as HotelModel, PrismaClient } from '@prisma/client';

import { ISaveHotelRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaSaveHotelRepository implements ISaveHotelRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async save(
    hotelParams: ISaveHotelRepository.Params,
  ): Promise<ISaveHotelRepository.Result> {
    try {
      const { ...restHotelParams } = hotelParams;

      const hotelDTO = await this.prismaConnection.hotel.create({
        data: restHotelParams,
      });

      const hotel = new Hotel(convertNullToUndefined<HotelModel>(hotelDTO));

      return hotel;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
