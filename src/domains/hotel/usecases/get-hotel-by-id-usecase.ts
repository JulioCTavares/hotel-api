import { IGetHotelByIdRepository } from '@/domains/hotel/usecases/repos';
import { Hotel } from '@/domains/hotel/entities';

import { ILoggerLocal } from '@/shared/protocols';

export interface IGetHotelByIdUsecase {
  execute(
    id: IGetHotelByIdUsecase.Params
  ): Promise<IGetHotelByIdUsecase.Result>;
}

export namespace IGetHotelByIdUsecase {
  export type Params = string;
  export type Result = Hotel | null;
}

export class GetHotelByIdUsecase implements IGetHotelByIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getHotelByIdRepository: IGetHotelByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'get-hotel-by-id' });
  }

  async execute(
    id: IGetHotelByIdUsecase.Params,
  ): Promise<IGetHotelByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } });

    const hotelExists = await this.getHotelByIdRepository.get(id);

    if (!hotelExists) return null;

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotelExists,
    });

    return hotelExists;
  }
}
