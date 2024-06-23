import { DeleteBookingByIdUsecase } from '@/domains/booking/usecases'
import {
  IGetBookingByIdRepository,
  IDeleteBookingByIdRepository,
} from '@/domains/booking/usecases/repos'

import { ILoggerLocal } from '@/shared/protocols'

export interface DeleteBookingByIdRequest {
  id: string
}

export type DeleteBookingByIdResponse = void

export class DeleteBookingByIdController {
  private usecase: DeleteBookingByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    deleteBookingByIdRepository: IDeleteBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new DeleteBookingByIdUsecase(
      getBookingByIdRepository,
      deleteBookingByIdRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'delete-booking-by-id' })
  }

  async execute(
    request: DeleteBookingByIdRequest,
  ): Promise<DeleteBookingByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id } = request

    await this.usecase.execute(id)

    this.logger.logDebug({ message: 'Booking deleted', data: { id } })
  }
}
