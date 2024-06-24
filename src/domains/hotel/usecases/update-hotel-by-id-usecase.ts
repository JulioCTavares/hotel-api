import {
  IGetHotelByIdRepository,
  IGetHotelByNameRepository,
  IUpdateHotelRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelNotFoundException,
  HotelAlreadyExistsException,
} from '@/domains/hotel/usecases/exceptions';
import {
  Hotel,
} from '@/domains/hotel/entities';

import { ILoggerLocal } from '@/shared/protocols';

export interface IUpdateHotelByIdUsecase {
  execute(
    updateParams: IUpdateHotelByIdUsecase.Params,
  ): Promise<IUpdateHotelByIdUsecase.Result>;
}

export namespace IUpdateHotelByIdUsecase {
  export type Params = {
    id: string;
    paramsToUpdate: {
      name?: string;
      enabled?: boolean;
    };
  };
  export type Result = Hotel;
}

export class UpdateHotelByIdUsecase implements IUpdateHotelByIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getHotelByIdRepository: IGetHotelByIdRepository,
    private readonly getHotelByNameRepository: IGetHotelByNameRepository,
    private readonly updateHotelRepository: IUpdateHotelRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'update-hotel-by-id' });
  }

  async execute(
    updateParams: IUpdateHotelByIdUsecase.Params,
  ): Promise<IUpdateHotelByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams });

    const { id, paramsToUpdate } = updateParams;

    const hotelExists = await this.getHotelByIdRepository.get(id);

    if (!hotelExists) {
      this.logger.logError({
        message: 'Hotel found',
        data: updateParams,
      });

      throw new HotelNotFoundException({ id });
    }

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotelExists,
    });

    const hotelToUpdate = new Hotel({
      ...hotelExists,
      ...paramsToUpdate,
    });

    if (paramsToUpdate.name) {
      const isHotel = await this.getHotelByNameRepository.get(
        paramsToUpdate.name
      );

      if (isHotel && isHotel.id !== id) {
        this.logger.logError({
          message: 'Hotel already exist',
          data: isHotel,
        });

        throw new HotelAlreadyExistsException({
          name: hotelToUpdate.name,
        });
      }
    }

    const hotelUpdated = await this.updateHotelRepository.update(
      hotelToUpdate,
    );

    this.logger.logDebug({
      message: 'Hotel updated',
      data: hotelUpdated,
    });

    return hotelUpdated;
  }
}
