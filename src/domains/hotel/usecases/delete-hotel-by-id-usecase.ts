import {
  IGetHotelByIdRepository,
  IDeleteHotelByIdRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelNotFoundException,
} from '@/domains/hotel/usecases/exceptions';

import { ILoggerLocal } from '@/shared/protocols';

export interface IDeleteHotelByIdUsecase {
  execute(
    id: IDeleteHotelByIdUsecase.Params
  ): Promise<IDeleteHotelByIdUsecase.Result>;
}

export namespace IDeleteHotelByIdUsecase {
  export type Params = string;
  export type Result = void;
}

export class DeleteHotelByIdUsecase implements IDeleteHotelByIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getHotelByIdRepository: IGetHotelByIdRepository,
    private readonly deleteHotelByIdRepository: IDeleteHotelByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'delete-hotel-by-id' });
  }

  async execute(
    id: IDeleteHotelByIdUsecase.Params,
  ): Promise<IDeleteHotelByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } });

    const hotelExists = await this.getHotelByIdRepository.get(id);

    if (!hotelExists) {
      throw new HotelNotFoundException({ id });
    }

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotelExists,
    });

    await this.deleteHotelByIdRepository.delete(id);

    this.logger.logDebug({ message: 'Hotel deleted', data: { id } });
  }
}
