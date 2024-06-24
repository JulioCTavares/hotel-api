import { CreateBookingUsecase } from '@/domains/booking/usecases'
import { ISaveBookingRepository } from '@/domains/booking/usecases/repos'
import {
  BookingDefaultPresenter,
  BookingTransformers,
} from '@/domains/booking/interface/presenters'

import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import { BookingStatus } from '@/domains/booking/entities'

export interface CreateBookingRequest {
  roomNumber: number
  bookingAmount: number
  bookingDate: Date
  startDate: Date
  endDate: Date
  status: BookingStatus
  userId: string
  hotelId?: string
}

export type CreateBookingResponse = BookingDefaultPresenter

export class CreateBookingController {
  private usecase: CreateBookingUsecase
  private logger: ILoggerLocal

  constructor(
    saveBookingRepository: ISaveBookingRepository,
    uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.usecase = new CreateBookingUsecase(
      saveBookingRepository,
      uuidGenerator,
      logger,
    )

    this.logger = logger.child({ controller: 'create-booking' })
  }

  async execute(request: CreateBookingRequest): Promise<CreateBookingResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const bookingCreated = await this.usecase.execute(request)

    const bookingCreatedPresenter =
      BookingTransformers.generateDefaultPresenter(bookingCreated)

    this.logger.logDebug({
      message: 'Booking created',
      data: bookingCreatedPresenter,
    })

    return bookingCreatedPresenter
  }
}
