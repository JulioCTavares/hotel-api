import { GetHotelByIdUsecase } from '@/domains/hotel/usecases'
import { IGetHotelByIdRepository } from '@/domains/hotel/usecases/repos'
import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'

export interface GetHotelByIdRequest {
  id: string
}

export type GetHotelByIdResponse = { hotel: HotelDefaultPresenter } | null

export class GetHotelByIdController {
  private usecase: GetHotelByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new GetHotelByIdUsecase(getHotelByIdRepository, logger)

    this.logger = logger.child({ controller: 'get-hotel-by-id' })
  }

  async execute(request: GetHotelByIdRequest): Promise<GetHotelByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id } = request

    const hotel = await this.usecase.execute(id)

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotel,
    })

    if (!hotel) {
      return null
    }

    const hotelDefaultPresenter =
      HotelTransformers.generateDefaultPresenter(hotel)

    return { hotel: hotelDefaultPresenter }
  }
}
