import { ICustomer, IResult, Result } from '@domain/models';
import { IRepository } from '@domain/repositories';

export class GetCustomerUsecase {
  constructor(private customerRepository: IRepository<ICustomer>) {}

  async execute(id: string): Promise<IResult<ICustomer>> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      Result.failure('Customer not found');
    }

    return Result.success(customer!);
  }
}
