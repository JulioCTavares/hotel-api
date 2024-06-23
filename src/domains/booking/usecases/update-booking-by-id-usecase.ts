import {
  IGetBookingByIdRepository,
  IUpdateBookingRepository,
} from '@/domains/booking/usecases/repos'
import { BookingNotFoundException } from '@/domains/booking/usecases/exceptions'
import { Booking, BookingStatus } from '@/domains/booking/entities'

import { ILoggerLocal } from '@/shared/protocols'

export interface IUpdateBookingByIdUsecase {
  execute(
    updateParams: IUpdateBookingByIdUsecase.Params,
  ): Promise<IUpdateBookingByIdUsecase.Result>
}

export namespace IUpdateBookingByIdUsecase {
  export type Params = {
    id: string
    paramsToUpdate: {
      roomNumber?: number
      bookingAmount?: number
      bookingDate?: Date
      startDate?: Date
      endDate?: Date
      userId?: string
      status?: BookingStatus
    }
  }
  export type Result = Booking
}

export class UpdateBookingByIdUsecase implements IUpdateBookingByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getBookingByIdRepository: IGetBookingByIdRepository,
    private readonly updateBookingRepository: IUpdateBookingRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'update-booking-by-id' })
  }

  async execute(
    updateParams: IUpdateBookingByIdUsecase.Params,
  ): Promise<IUpdateBookingByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams })

    const { id, paramsToUpdate } = updateParams

    const bookingExists = await this.getBookingByIdRepository.get(id)

    if (!bookingExists) {
      this.logger.logError({
        message: 'Booking found',
        data: updateParams,
      })

      throw new BookingNotFoundException({ id })
    }

    this.logger.logDebug({
      message: 'Booking found',
      data: bookingExists,
    })

    const bookingToUpdate = new Booking({
      ...bookingExists,
      ...paramsToUpdate,
    })

    const bookingUpdated =
      await this.updateBookingRepository.update(bookingToUpdate)

    this.logger.logDebug({
      message: 'Booking updated',
      data: bookingUpdated,
    })

    return bookingUpdated
  }
}
