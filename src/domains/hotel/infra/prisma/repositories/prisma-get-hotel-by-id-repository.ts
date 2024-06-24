import { Hotel as HotelModel, PrismaClient } from '@prisma/client';

import { IGetHotelByIdRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaGetHotelByIdRepository
  implements IGetHotelByIdRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    id: IGetHotelByIdRepository.Params,
  ): Promise<IGetHotelByIdRepository.Result> {
    try {
      const hotelDTO = await this.prismaConnection.hotel.findFirst({
        where: { id, enabled: true },
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
