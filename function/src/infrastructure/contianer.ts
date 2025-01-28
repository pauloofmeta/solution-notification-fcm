import { asClass, createContainer, InjectionMode } from 'awilix';
import { BaseRepository } from './database/repositories';
import { MongoDatabase } from './database/MongoDatabase';
import { BcryptHashService } from './services/BcryptHashService';
import { JwtTokenService } from './services/JwtTokenService';
import { UserSchema, CustomerSchema } from './database/schemas';
import { LoginUseCase } from '@application/usecases/auth';
import {
  CreateCustomerUsecase,
  DeleteCustomerUsecase,
  GetCustomerUsecase,
  ListCustomersUsecase,
  UpdateCustomerUsecase,
} from '@application/usecases/customer';
import {
  CreateUserUseCase,
  ListUsersUseCase,
} from '@application/usecases/user';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  database: asClass(MongoDatabase).singleton(),
  // Services
  hashService: asClass(BcryptHashService).singleton(),
  tokenService: asClass(JwtTokenService).singleton(),
  // Repositories
  userRepository: asClass(BaseRepository)
    .inject(() => ({ model: UserSchema }))
    .singleton(),
  customerRepository: asClass(BaseRepository)
    .inject(() => ({
      model: CustomerSchema,
    }))
    .singleton(),
  // User use cases
  createUserUseCase: asClass(CreateUserUseCase).transient(),
  loginUseCase: asClass(LoginUseCase).transient(),
  listUsersUseCase: asClass(ListUsersUseCase).transient(),
  createCustomerUseCase: asClass(CreateCustomerUsecase).transient(),
  updateCustomerUseCase: asClass(UpdateCustomerUsecase).transient(),
  deleteCustomerUseCase: asClass(DeleteCustomerUsecase).transient(),
  getCustomerUseCase: asClass(GetCustomerUsecase).transient(),
  listCustomersUseCase: asClass(ListCustomersUsecase).transient(),
});

export { container };
