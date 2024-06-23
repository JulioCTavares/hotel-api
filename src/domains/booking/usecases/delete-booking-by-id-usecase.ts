import {
  IGetBookingByIdRepository,
  IDeleteBookingByIdRepository,
} from '@/domains/booking/usecases/repos'
import { BookingNotFoundException } from '@/domains/booking/usecases/exceptions'

import { ILoggerLocal } from '@/shared/protocols'

export interface IDeleteBookingByIdUsecase {
  execute(
    id: IDeleteBookingByIdUsecase.Params,
  ): Promise<IDeleteBookingByIdUsecase.Result>
}

export namespace IDeleteBookingByIdUsecase {
  export type Params = string
  export type Result = void
}

export class DeleteBookingByIdUsecase implements IDeleteBookingByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getBookingByIdRepository: IGetBookingByIdRepository,
    private readonly deleteBookingByIdRepository: IDeleteBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'delete-booking-by-id' })
  }

  async execute(
    id: IDeleteBookingByIdUsecase.Params,
  ): Promise<IDeleteBookingByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } })

    const bookingExists = await this.getBookingByIdRepository.get(id)

    if (!bookingExists) {
      throw new BookingNotFoundException({ id })
    }

    this.logger.logDebug({
      message: 'Booking found',
      data: bookingExists,
    })

    await this.deleteBookingByIdRepository.delete(id)

    this.logger.logDebug({ message: 'Booking deleted', data: { id } })
  }
}
