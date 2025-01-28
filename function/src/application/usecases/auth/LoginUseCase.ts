import { IResult, Result, IToken, IUser } from '@domain/models';
import { HashService, TokenService } from '@domain/ports';
import { IRepository } from '@domain/repositories';
import { LoginInputSchema } from './LoginInputSchema';

export class LoginUseCase {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: IRepository<IUser>,
    private readonly tokenService: TokenService
  ) {}

  async execute(payload: unknown): Promise<IResult<IToken>> {
    const { email, password } = LoginInputSchema.parse(payload);

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return Result.failure(
        'Authtentication failed, email or password invalid!'
      );
    }

    const passwordMatch = await this.hashService.compare(
      password,
      user.passwordHash
    );
    if (!passwordMatch) {
      return Result.failure(
        'Authtentication failed, email or password invalid!'
      );
    }

    const token = this.tokenService.generate(user);
    return Result.success(token);
  }
}
