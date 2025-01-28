import { IUser } from '@domain/models';
import { IRepository } from '@domain/repositories';

export class ListUsersUseCase {
  constructor(private readonly userRepository: IRepository<IUser>) {}

  async execute(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }
}
