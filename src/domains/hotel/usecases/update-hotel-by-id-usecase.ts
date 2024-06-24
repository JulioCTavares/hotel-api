import {
  IGetHotelByIdRepository,
  IUpdateHotelRepository,
} from '@/domains/hotel/usecases/repos'
import { HotelNotFoundException } from '@/domains/hotel/usecases/exceptions'
import { Hotel } from '@/domains/hotel/entities'

import { ILoggerLocal } from '@/shared/protocols'

export interface IUpdateHotelByIdUsecase {
  execute(
    updateParams: IUpdateHotelByIdUsecase.Params,
  ): Promise<IUpdateHotelByIdUsecase.Result>
}

export namespace IUpdateHotelByIdUsecase {
  export type Params = {
    id: string
    paramsToUpdate: {
      name?: string
      city?: string
      state?: string
      country?: string
    }
  }
  export type Result = Hotel
}

export class UpdateHotelByIdUsecase implements IUpdateHotelByIdUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly getHotelByIdRepository: IGetHotelByIdRepository,
    private readonly updateHotelRepository: IUpdateHotelRepository,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'update-hotel-by-id' })
  }

  async execute(
    updateParams: IUpdateHotelByIdUsecase.Params,
  ): Promise<IUpdateHotelByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams })

    const { id, paramsToUpdate } = updateParams

    const hotelExists = await this.getHotelByIdRepository.get(id)

    if (!hotelExists) {
      this.logger.logError({
        message: 'Hotel not found',
        data: updateParams,
      })

      throw new HotelNotFoundException({ id })
    }

    this.logger.logDebug({
      message: 'Hotel found',
      data: hotelExists,
    })

    const hotelToUpdate = new Hotel({
      ...hotelExists,
      ...paramsToUpdate,
    })

    const hotelUpdated = await this.updateHotelRepository.update(hotelToUpdate)

    this.logger.logDebug({
      message: 'Hotel updated',
      data: hotelUpdated,
    })

    return hotelUpdated
  }
}
