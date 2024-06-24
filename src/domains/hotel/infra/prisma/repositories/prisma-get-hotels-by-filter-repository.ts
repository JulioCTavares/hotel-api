import { Hotel as HotelModel, PrismaClient } from '@prisma/client';

import { IGetHotelsByFilterRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { convertNullToUndefined } from '@/shared/helpers';

import {
  prismaConnector,
  PrismaFormatter,
  PrismaException,
} from '@/shared/infra/prisma';

export class PrismaGetHotelsByFilterRepository
  implements IGetHotelsByFilterRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    filter: IGetHotelsByFilterRepository.Params,
  ): Promise<IGetHotelsByFilterRepository.Result> {
    try {
      const {
        orderBy,
        pagination,
        filters,
      } = filter;

      const filtersFormated = PrismaFormatter.formatFilter(filters);

      const hotelDTOs = await this.prismaConnection.hotel.findMany({
        where: {
          ...filtersFormated,
          enabled: filters.enabled ?? true,
        },
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      });

      const hotels = hotelDTOs.map((hotelDTO) => {
        return new Hotel(convertNullToUndefined<HotelModel>(hotelDTO));
      });

      return hotels;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
