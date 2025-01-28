import { ICustomer, IResult, Result } from '@domain/models';
import { IRepository } from '@domain/repositories';
import { UpdateCustomerSchema } from './schemas/UpdateCustomerSchema';

export class UpdateCustomerUsecase {
  constructor(private readonly customerRepository: IRepository<ICustomer>) {}

  async execute(
    id: string,
    data: Partial<ICustomer>
  ): Promise<IResult<ICustomer>> {
    const customer = UpdateCustomerSchema.parse(data);

    try {
      const updated = await this.customerRepository.update(id, customer);
      if (!updated) {
        return Result.failure('Customer not found');
      }

      return Result.success(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return Result.failure(`Error updating customer: ${message}`);
    }
  }
}
