import { Hotel } from '@/domains/hotel/entities'
import { ISaveHotelRepository } from '@/domains/hotel/usecases/repos'

import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols'

export interface ICreateHotelUsecase {
  execute(
    params: ICreateHotelUsecase.Params,
  ): Promise<ICreateHotelUsecase.Response>
}

export namespace ICreateHotelUsecase {
  export type Params = {
    name: string
    city: string
    state: string
    country: string
  }

  export type Response = Hotel
}

export class CreateHotelUsecase implements ICreateHotelUsecase {
  private logger: ILoggerLocal

  constructor(
    private readonly saveHotelRepository: ISaveHotelRepository,
    private readonly uuidGenerator: IUuidGenerator,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'create-hotel' })
  }

  async execute(
    params: ICreateHotelUsecase.Params,
  ): Promise<ICreateHotelUsecase.Response> {
    this.logger.logDebug({ message: 'Request received', data: params })

    const id = this.uuidGenerator.generate()

    const hotel = new Hotel({ id, ...params })

    const hotelCreated = await this.saveHotelRepository.save(hotel)

    this.logger.logDebug({
      message: 'Hotel created',
      data: hotelCreated,
    })

    return hotelCreated
  }
}
