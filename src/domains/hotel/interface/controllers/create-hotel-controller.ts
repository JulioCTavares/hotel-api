import { CreateHotelUsecase } from '@/domains/hotel/usecases'
import { ISaveHotelRepository } from '@/domains/hotel/usecases/repos'
import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters'

import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'
import { z } from 'zod'

export interface CreateHotelRequest {
  name: string
  city: string
  state: string
  country: string
}

export type CreateHotelResponse = HotelDefaultPresenter

const createHotelSchema = z.object({
  name: z.string({
    invalid_type_error: 'name should be a string',
    required_error: 'name is required',
  }),
  city: z.string({
    invalid_type_error: 'city should be a string',
    required_error: 'city is required',
  }),
  state: z.string({
    invalid_type_error: 'state should be a string',
    required_error: 'state is required',
  }),
  country: z.string({
    invalid_type_error: 'country should be a string',
    required_error: 'country is required',
  }),
})

export class CreateHotelController {
  private usecase: CreateHotelUsecase
  private logger: ILoggerLocal

  constructor(
    saveHotelRepository: ISaveHotelRepository,
    uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.usecase = new CreateHotelUsecase(
      saveHotelRepository,
      uuidGenerator,
      logger,
    )

    this.logger = logger.child({ controller: 'create-hotel' })
  }

  async execute(request: CreateHotelRequest): Promise<CreateHotelResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const validatedRequest = createHotelSchema.parse(request)
    this.logger.logDebug({ message: 'Params validated' })

    const hotelCreated = await this.usecase.execute(validatedRequest)

    const hotelCreatedPresenter =
      HotelTransformers.generateDefaultPresenter(hotelCreated)

    this.logger.logDebug({
      message: 'Hotel created',
      data: hotelCreatedPresenter,
    })

    return hotelCreatedPresenter
  }
}
