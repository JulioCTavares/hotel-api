import { UpdateHotelByIdUsecase } from '@/domains/hotel/usecases'
import {
  IGetHotelByIdRepository,
  IUpdateHotelRepository,
} from '@/domains/hotel/usecases/repos'

import {
  HotelDefaultPresenter,
  HotelTransformers,
} from '@/domains/hotel/interface/presenters'

import { ILoggerLocal } from '@/shared/protocols'

export interface UpdateHotelByIdRequest {
  id: string
  paramsToUpdate: {
    name?: string
    city?: string
    state?: string
    country?: string
  }
}

export type UpdateHotelByIdResponse = HotelDefaultPresenter

export class UpdateHotelByIdController {
  private usecase: UpdateHotelByIdUsecase
  private logger: ILoggerLocal

  constructor(
    getHotelByIdRepository: IGetHotelByIdRepository,
    updateHotelRepository: IUpdateHotelRepository,
    logger: ILoggerLocal,
  ) {
    this.usecase = new UpdateHotelByIdUsecase(
      getHotelByIdRepository,
      updateHotelRepository,
      logger,
    )

    this.logger = logger.child({ controller: 'update-hotel-by-id' })
  }

  async execute(
    request: UpdateHotelByIdRequest,
  ): Promise<UpdateHotelByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request })

    const { id, paramsToUpdate } = request

    const hotelUpdated = await this.usecase.execute({
      id,
      paramsToUpdate,
    })

    const hotelUpdatedPresenter =
      HotelTransformers.generateDefaultPresenter(hotelUpdated)

    this.logger.logDebug({
      message: 'Hotel updated',
      data: hotelUpdatedPresenter,
    })

    return hotelUpdatedPresenter
  }
}
