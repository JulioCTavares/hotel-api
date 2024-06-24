import {
  GetHotelsByFilterUsecase,
} from '@/domains/hotel/usecases';
import {
  ICountHotelsByFilterRepository,
  IGetHotelsByFilterRepository,
} from '@/domains/hotel/usecases/repos';

import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters';

import {
  OrderByFilter,
  OrderByMode,
  DateFilter,
  Pagination,
  ValidationException,
} from '@/shared/helpers';

import { ILoggerLocal } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';

export interface GetHotelsByFilterRequest {
  name?: string;
  createdAt?: DateFilter;
  updatedAt?: DateFilter;
  orderBy: {
    property?: string;
    mode?: OrderByMode;
  };
  take?: number;
  skip?: number;
  count?: boolean;
}

export type GetHotelsByFilterResponse =
  | {
      items: HotelDefaultPresenter[];
      totalItemsListed: number;
      totalItems: number;
    }
  | { totalItems: number };

export class GetHotelsByFilterController {
  private usecase: GetHotelsByFilterUsecase;
  private logger: ILoggerLocal;

  constructor(
    getHotelsByFilterRepository: IGetHotelsByFilterRepository,
    countHotelsByFilterRepository: ICountHotelsByFilterRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetHotelsByFilterUsecase(
      getHotelsByFilterRepository,
      countHotelsByFilterRepository,
      logger,
    );

    this.logger = logger.child({ controller: 'get-hotels-by-filter' });
  }

  async execute(
    request: GetHotelsByFilterRequest,
  ): Promise<GetHotelsByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const {
      orderBy: orderByDTO,
      take,
      skip,
      name,
      createdAt,
      updatedAt,
      count,
    } = request;

    const orderBy = new OrderByFilter(orderByDTO);
    const pagination = new Pagination({ take, skip });

    const { hotels, totalHotels } = await this.usecase.execute({
      filters: {
        name,
        createdAt,
        updatedAt,
      },
      orderBy,
      pagination,
      count,
    });

    this.logger.logDebug({
      message: 'Hotels found',
      data: { totalHotels, totalItemsListed: hotels?.length },
    });

    if (count) {
      return {
        totalItems: totalHotels,
      };
    }

    const hotelsDTOs = hotels?.map((hotel) =>
      HotelTransformers.generateDefaultPresenter(hotel)
    );

    return {
      items: hotelsDTOs,
      totalItems: totalHotels,
      totalItemsListed: hotelsDTOs?.length,
    };
  }
}
