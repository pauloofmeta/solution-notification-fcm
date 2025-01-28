import { ICustomer, IResult, Result } from '@domain/models';
import { IRepository } from '@domain/repositories';

export class DeleteCustomerUsecase {
  constructor(private readonly customerRepository: IRepository<ICustomer>) {}

  async execute(id: string): Promise<IResult<ICustomer>> {
    try {
      const customer = await this.customerRepository.delete(id);
      if (!customer) {
        return Result.failure('Customer not found');
      }
      return Result.success(customer);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return Result.failure(`Error deleting customer: ${message}`);
    }
  }
}
