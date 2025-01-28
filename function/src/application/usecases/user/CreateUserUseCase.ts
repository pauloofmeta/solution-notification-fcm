import { IUser, IResult, Result } from '@domain/models';
import { HashService } from '@domain/ports';
import { IRepository } from '@domain/repositories';
import { CreateUserInputSchema } from './CreateUserSchema';

export class CreateUserUseCase {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: IRepository<IUser>
  ) {}

  async execute(payload: unknown): Promise<IResult<IUser>> {
    const { name, email, password } = CreateUserInputSchema.parse(payload);

    const exists = await this.userRepository.findOne({ email });
    if (exists) {
      return Result.failure('User with this email already exists');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return Result.success(user);
  }
}
