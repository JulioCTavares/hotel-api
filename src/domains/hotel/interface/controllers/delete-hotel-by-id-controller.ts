import { DeleteHotelByIdUsecase } from '@/domains/hotel/usecases'
import {
  IGetHotelByIdRepository,
  IDeleteHotelByIdRepository,
} from '@/domains/hotel/usecases/repos'

import { ILoggerLocal } from '@/shared/protocols'

export interface DeleteHotelByIdRequest {
  id: string
}

export type DeleteHotelByIdResponse = void

export class DeleteHotelByIdController {
  private usecase: DeleteHotelByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    deleteHotelByIdRepository: IDeleteHotelByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new DeleteHotelByIdUsecase(
      getHotelByIdRepository,
      deleteHotelByIdRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'delete-hotel-by-id' })
  }

  async execute(
    request: DeleteHotelByIdRequest,
  ): Promise<DeleteHotelByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id } = request

    await this.usecase.execute(id)

    this.logger.logDebug({ message: 'Hotel deleted', data: { id } })
  }
}
