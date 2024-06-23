import {
  IAccessTokenGenerator,
  IComparer,
  ILoggerLocal,
  IRefreshTokenGenerator,
} from '@/shared/protocols'
import { InvalidCredentialsException } from './exceptions'
import {
  ILoginUserRepository,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth/usecase/repos'

export class JWTLoginUserRepository implements ILoginUserRepository {
  private logger: ILoggerLocal

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly accessTokenGenerator: IAccessTokenGenerator,
    private readonly refreshTokenGenerator: IRefreshTokenGenerator,
    private readonly comparer: IComparer,
    logger: ILoggerLocal,
  ) {
    this.logger = logger.child({ usecase: 'login-user' })
  }

  async execute(
    loginParams: ILoginUserRepository.Params,
  ): Promise<ILoginUserRepository.Result> {
    const { email, password } = loginParams

    const authUserFound =
      await this.getAuthUserByEmailRepository.getByEmail(email)

    if (!authUserFound) {
      throw new InvalidCredentialsException()
    }

    const passwordMatches = this.comparer.compare(
      password,
      authUserFound.password,
    )

    if (!passwordMatches) {
      throw new InvalidCredentialsException()
    }

    const accessToken = this.accessTokenGenerator.generate(authUserFound)
    const refreshToken = this.refreshTokenGenerator.generate(authUserFound)

    this.logger.logDebug({
      message: 'User logged in successfully',
      data: authUserFound,
    })
    return { access: { accessToken, refreshToken }, authUser: authUserFound }
  }
}
