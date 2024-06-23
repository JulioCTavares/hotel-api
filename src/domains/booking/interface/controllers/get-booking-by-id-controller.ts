import { GetBookingByIdUsecase } from '@/domains/booking/usecases'
import { IGetBookingByIdRepository } from '@/domains/booking/usecases/repos'
import {
  BookingDefaultPresenter,
  BookingTransformers,
} from '@/domains/booking/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'

export interface GetBookingByIdRequest {
  id: string
}

export type GetBookingByIdResponse = { booking: BookingDefaultPresenter } | null

export class GetBookingByIdController {
  private usecase: GetBookingByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetBookingByIdUsecase(getBookingByIdRepository, logger)

    this.logger = logger.child({ controller: 'get-booking-by-id' })
  }

  async execute(
    request: GetBookingByIdRequest,
  ): Promise<GetBookingByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id } = request

    const booking = await this.usecase.execute(id)

    this.logger.logDebug({
      message: 'Booking found',
      data: booking,
    })

    if (!booking) {
      return null
    }

    const bookingDefaultPresenter =
      BookingTransformers.generateDefaultPresenter(booking)

    return { booking: bookingDefaultPresenter }
  }
}
