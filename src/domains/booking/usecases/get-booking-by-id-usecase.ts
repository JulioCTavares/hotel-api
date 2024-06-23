import { IGetBookingByIdRepository } from '@/domains/booking/usecases/repos'
import { Booking } from '@/domains/booking/entities'

import { ILoggerLocal } from '@/shared/protocols'

export interface IGetBookingByIdUsecase {
  execute(
    id: IGetBookingByIdUsecase.Params,
  ): Promise<IGetBookingByIdUsecase.Result>
}

export namespace IGetBookingByIdUsecase {
  export type Params = string
  export type Result = Booking | null
}

export class GetBookingByIdUsecase implements IGetBookingByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getBookingByIdRepository: IGetBookingByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'get-booking-by-id' })
  }

  async execute(
    id: IGetBookingByIdUsecase.Params,
  ): Promise<IGetBookingByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } })

    const bookingExists = await this.getBookingByIdRepository.get(id)

    if (!bookingExists) return null

    this.logger.logDebug({
      message: 'Booking found',
      data: bookingExists,
    })

    return bookingExists
  }
}
