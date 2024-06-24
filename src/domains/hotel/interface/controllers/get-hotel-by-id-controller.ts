import {
  GetHotelByIdUsecase,
} from '@/domains/hotel/usecases';
import {
  IGetHotelByIdRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters';

import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface GetHotelByIdRequest {
  id: string;
}

export type GetHotelByIdResponse = { hotel: HotelDefaultPresenter } | null;

export class GetHotelByIdController {
  private usecase: GetHotelByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetHotelByIdUsecase(
      getHotelByIdRepository,
      logger,
    );

    this.logger = logger.child({ controller: 'get-hotel-by-id' });
  }

  async execute(
    request: GetHotelByIdRequest
  ): Promise<GetHotelByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { id } = request;

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const hotel = await this.usecase.execute(id);

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotel,
    });

    if (!hotel) {
      return null;
    }

    const hotelDefaultPresenter =
      HotelTransformers.generateDefaultPresenter(hotel);

    return { hotel: hotelDefaultPresenter };
  }
}
