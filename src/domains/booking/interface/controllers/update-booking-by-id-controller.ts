import { UpdateBookingByIdUsecase } from '@/domains/booking/usecases'
import {
  IGetBookingByIdRepository,
  IUpdateBookingRepository,
} from '@/domains/booking/usecases/repos'

import {
  BookingDefaultPresenter,
  BookingTransformers,
} from '@/domains/booking/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'
import { BookingStatus } from '../../entities'

export interface UpdateBookingByIdRequest {
  id: string
  paramsToUpdate: {
    roomNumber?: number
    bookingAmount?: number
    bookingDate?: Date
    startDate?: Date
    endDate?: Date
    userId?: string
    hotelId?: string
    status?: BookingStatus
  }
}

export type UpdateBookingByIdResponse = BookingDefaultPresenter

export class UpdateBookingByIdController {
  private usecase: UpdateBookingByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getBookingByIdRepository: IGetBookingByIdRepository,
    updateBookingRepository: IUpdateBookingRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new UpdateBookingByIdUsecase(
      getBookingByIdRepository,
      updateBookingRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'update-booking-by-id' })
  }

  async execute(
    request: UpdateBookingByIdRequest,
  ): Promise<UpdateBookingByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id, paramsToUpdate } = request

    const bookingUpdated = await this.usecase.execute({
      id,
      paramsToUpdate,
    })

    const bookingUpdatedPresenter =
      BookingTransformers.generateDefaultPresenter(bookingUpdated)

    this.logger.logDebug({
      message: 'Booking updated',
      data: bookingUpdatedPresenter,
    })

    return bookingUpdatedPresenter
  }
}
