import { ICustomer, IResult, Result } from '@domain/models';
import { IRepository } from '@domain/repositories';
import { CreateCustomerSchema } from './schemas/CreateCustomerSchema';

export class CreateCustomerUsecase {
  constructor(private readonly customerRepository: IRepository<ICustomer>) {}

  async execute(data: Partial<ICustomer>): Promise<IResult<ICustomer>> {
    const customer = CreateCustomerSchema.parse(data);

    try {
      const created = await this.customerRepository.create(customer);
      return Result.success(created);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return Result.failure(`Error creating customer: ${message}`);
    }
  }
}
