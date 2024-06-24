import {
  ISaveHotelRepository,
  IGetHotelByNameRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelAlreadyExistsException,
} from '@/domains/hotel/usecases/exceptions';
import {
  CreateHotelController,
} from '@/domains/hotel/interface/controllers';

import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, created, serverError } from '@/shared/interface/http/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';

export interface HttpCreateHotelRequest {
  name: string;
}

export class HttpCreateHotelController implements HttpController {
  private controller: CreateHotelController;
  private logger: ILoggerLocal;

  constructor(
    getHotelByNameRepository: IGetHotelByNameRepository,
    saveHotelRepository: ISaveHotelRepository,
    uuidGenerator: IUuidGenerator,
    validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.controller = new CreateHotelController(
      getHotelByNameRepository,
      saveHotelRepository,
      uuidGenerator,
      validation,
      logger,
    );

    this.logger = logger.child({ httpController: 'create-hotel' });
  }

  async handle(httpRequest: HttpCreateHotelRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { name } = httpRequest;

    try {
      const hotelCreated = await this.controller.execute({
        name,
      });

      this.logger.logDebug({
        message: 'Hotel created',
        data: hotelCreated,
      });

      return created(hotelCreated);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof HotelAlreadyExistsException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
