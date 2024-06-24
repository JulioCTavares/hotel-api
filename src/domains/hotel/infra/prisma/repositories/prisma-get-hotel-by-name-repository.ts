import { Hotel as HotelModel, PrismaClient } from '@prisma/client';

import { IGetHotelByNameRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaGetHotelByNameRepository
  implements IGetHotelByNameRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    name: IGetHotelByNameRepository.Params,
  ): Promise<IGetHotelByNameRepository.Result> {
    try {
      const hotelDTO = await this.prismaConnection.hotel.findFirst({
        where: { name, enabled: true },
      });

      if (!hotelDTO) {
        return null;
      }

      const hotel = new Hotel(convertNullToUndefined<HotelModel>(hotelDTO));

      return hotel;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
