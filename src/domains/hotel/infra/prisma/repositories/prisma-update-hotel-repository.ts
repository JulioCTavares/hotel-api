import { Hotel as HotelModel, PrismaClient } from '@prisma/client';

import { IUpdateHotelRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaUpdateHotelRepository
  implements IUpdateHotelRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async update(
    hotelToUpdate: IUpdateHotelRepository.Params,
  ): Promise<IUpdateHotelRepository.Result> {
    try {
      const { id, ...restOfHotelParams } = hotelToUpdate;

      const hotelDTO = await this.prismaConnection.hotel.update({
        where: { id },
        data: restOfHotelParams,
      });

      const hotel = new Hotel(convertNullToUndefined<HotelModel>(hotelDTO));

      return hotel;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
