import {
  CreateHotelUsecase,
} from '@/domains/hotel/usecases';
import {
  ISaveHotelRepository,
  IGetHotelByNameRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters';

import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';

export interface CreateHotelRequest {
  name: string;
}

export type CreateHotelResponse = HotelDefaultPresenter;

export class CreateHotelController {
  private usecase: CreateHotelUsecase;
  private logger: ILoggerLocal;

  constructor(
    getHotelByNameRepository: IGetHotelByNameRepository,
    saveHotelRepository: ISaveHotelRepository,
    uuidGenerator: IUuidGenerator,
    private readonly validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.usecase = new CreateHotelUsecase(
      getHotelByNameRepository,
      saveHotelRepository,
      uuidGenerator,
      logger
    );

    this.logger = logger.child({ controller: 'create-hotel' });
  }

  async execute(
    request: CreateHotelRequest
  ): Promise<CreateHotelResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { name } = request;

    const hasError = this.validation.validate({
      name,
    });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const hotelCreated = await this.usecase.execute({ name });

    const hotelCreatedPresenter =
      HotelTransformers.generateDefaultPresenter(hotelCreated);

    this.logger.logDebug({
      message: 'Hotel created',
      data: hotelCreatedPresenter,
    });

    return hotelCreatedPresenter;
  }
}
