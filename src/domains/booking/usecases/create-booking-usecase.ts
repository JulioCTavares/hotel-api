import { BookingStatus, Booking } from '@/domains/booking/entities'
import { ISaveBookingRepository } from '@/domains/booking/usecases/repos'

import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'

export interface ICreateBookingUsecase {
  execute(
    params: ICreateBookingUsecase.Params,
  ): Promise<ICreateBookingUsecase.Response>
}

export namespace ICreateBookingUsecase {
  export type Params = {
    roomNumber: number
    bookingAmount: number
    bookingDate: Date
    startDate: Date
    endDate: Date
    status: BookingStatus
    userId: string
  }

  export type Response = Booking
}

export class CreateBookingUsecase implements ICreateBookingUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly saveBookingRepository: ISaveBookingRepository,
    private readonly uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'create-booking' })
  }

  async execute(
    params: ICreateBookingUsecase.Params,
  ): Promise<ICreateBookingUsecase.Response> {
    this.logger.logDebug({ message: 'Request received', data: params })

    const id = this.uuidGenerator.generate()

    const booking = new Booking({ id, ...params })

    const bookingCreated = await this.saveBookingRepository.save(booking)

    this.logger.logDebug({
      message: 'Booking created',
      data: bookingCreated,
    })

    return bookingCreated
  }
}
