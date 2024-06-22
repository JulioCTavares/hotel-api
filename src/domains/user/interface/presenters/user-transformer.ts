import { User } from '@/domains/user/entities'
import { UserDefaultPresenter } from '@/domains/user/interface/presenters'

export class UserTransformers {
  static generateDefaultTransformer(user: User): UserDefaultPresenter {
    const {
      id,
      name,
      email,
      phone,
      city,
      birthDate,
      state,
      country,
      createdAt,
      updatedAt,
    } = user

    const userPresenter: UserDefaultPresenter = {
      id,
      name,
      email,
      phone,
      birthDate,
      city,
      state,
      country,
      created_at: createdAt,
      updated_at: updatedAt,
    }

    return userPresenter
  }
}
