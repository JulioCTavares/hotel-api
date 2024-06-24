import {
  IDeleteHotelByIdRepository,
  IGetHotelByIdRepository,
} from '@/domains/hotel/usecases/repos';
import {
  HotelNotFoundException,
} from '@/domains/hotel/usecases/exceptions';
import {
  DeleteHotelByIdController,
} from '@/domains/hotel/interface/controllers';

import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import {
  noContent,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers';
import { ILoggerLocal } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

export interface HttpDeleteHotelByIdRequest {
  id: string;
}

export class HttpDeleteHotelByIdController implements HttpController {
  private controller: DeleteHotelByIdController;
  private logger: ILoggerLocal;

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    deleteHotelByIdRepository: IDeleteHotelByIdRepository,
    validation: Validation,
    logger: ILoggerLocal,
  ) {
    this.controller = new DeleteHotelByIdController(
      getHotelByIdRepository,
      deleteHotelByIdRepository,
      validation,
      logger,
    );

    this.logger = logger.child({ httpController: 'delete-hotel-by-id' });
  }

  async handle(
    httpRequest: HttpDeleteHotelByIdRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { id } = httpRequest;

    try {
      await this.controller.execute({ id });

      this.logger.logDebug({
        message: 'Hotel deleted',
        data: { id },
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof HotelNotFoundException) {
        return notFound(error);
      }

      return serverError(error as Error);
    }
  }
}
