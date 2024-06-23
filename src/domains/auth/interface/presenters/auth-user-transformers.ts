import { AuthUser } from '@/domains/auth/entities'
import { AuthUserDefaultPresenter } from '@/domains/auth/interface/presenters'

export class AuthUserTransformers {
  static generateDefaultPresenter(
    authUser: AuthUser,
  ): AuthUserDefaultPresenter {
    return {
      id: authUser.id,
      name: authUser.name,
      email: authUser.email,
      birthDate: authUser.birthDate,
      phone: authUser.phone,
      city: authUser.city,
      state: authUser.state,
      country: authUser.country,
      created_at: authUser.createdAt,
      updated_at: authUser.updatedAt,
    }
  }
}
