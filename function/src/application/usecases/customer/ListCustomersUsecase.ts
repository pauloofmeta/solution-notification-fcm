import { ICustomer } from '@domain/models';
import { IRepository } from '@domain/repositories';

export class ListCustomersUsecase {
  constructor(private customerRepository: IRepository<ICustomer>) {}

  async execute(): Promise<ICustomer[]> {
    const customers = await this.customerRepository.findAll();

    return customers;
  }
}
