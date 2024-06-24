import {
  UpdateHotelByIdUsecase,
} from '@/domains/hotel/usecases';
import {
  IGetHotelByIdRepository,
  IUpdateHotelRepository,
  IGetHotelByNameRepository,
} from '@/domains/hotel/usecases/repos';

import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters';

import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface UpdateHotelByIdRequest {
  id: string;
  paramsToUpdate: {
    name?: string;
  };
}

export type UpdateHotelByIdResponse = HotelDefaultPresenter;

export class UpdateHotelByIdController {
  private usecase: UpdateHotelByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    getHotelByNameRepository: IGetHotelByNameRepository,
    updateHotelRepository: IUpdateHotelRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.usecase = new UpdateHotelByIdUsecase(
      getHotelByIdRepository,
      getHotelByNameRepository,
      updateHotelRepository,
      logger,
    );

    this.logger = logger.child({ controller: 'update-hotel-by-id' });
  }

  async execute(
    request: UpdateHotelByIdRequest,
  ): Promise<UpdateHotelByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { id, paramsToUpdate } = request;

    const { name } = paramsToUpdate;

    const hasErrors = this.validation.validate({
      id,
      name,
    });

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const hotelUpdated = await this.usecase.execute({
      id,
      paramsToUpdate: {
        name,
      },
    });

    const hotelUpdatedPresenter =
      HotelTransformers.generateDefaultPresenter(hotelUpdated);

    this.logger.logDebug({
      message: 'Hotel updated',
      data: hotelUpdatedPresenter,
    });

    return hotelUpdatedPresenter;
  }
}
