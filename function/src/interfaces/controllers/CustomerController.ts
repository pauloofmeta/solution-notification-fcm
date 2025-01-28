import {
  CreateCustomerUsecase,
  DeleteCustomerUsecase,
  GetCustomerUsecase,
  ListCustomersUsecase,
  UpdateCustomerUsecase,
} from '@application/usecases/customer';
import { authMiddleware } from '@interfaces/middlewares';
import { before, DELETE, GET, PATCH, POST, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/customers')
@before(authMiddleware)
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUsecase,
    private readonly updateCustomerUseCase: UpdateCustomerUsecase,
    private readonly deleteCustomerUseCase: DeleteCustomerUsecase,
    private readonly getCustomerUseCase: GetCustomerUsecase,
    private readonly listCustomersUseCase: ListCustomersUsecase
  ) {}

  @POST()
  async createCustomer(req: Request, res: Response) {
    try {
      const result = await this.createCustomerUseCase.execute(req.body);
      if (!result.success) {
        return res.status(400).json(result);
      }
      return res.status(201).json(result.value);
    } catch (error) {
      return res.status(400).json({
        error: `An error occurred, ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  @PATCH()
  @route('/:id')
  async updateCustomer(req: Request, res: Response) {
    try {
      const result = await this.updateCustomerUseCase.execute(
        req.params.id,
        req.body
      );
      if (!result.success) {
        const status = result.message === 'Customer not found' ? 404 : 400;
        return res.status(status).json(result);
      }
      return res.status(200).json(result.value);
    } catch (error) {
      return res.status(400).json({
        error: `An error occurred, ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  @DELETE()
  async deleteCustomer(req: Request, res: Response) {
    try {
      const result = await this.deleteCustomerUseCase.execute(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({
        error: `An error occurred, ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  @GET()
  @route('/:id')
  async getCustomer(req: Request, res: Response) {
    try {
      const result = await this.getCustomerUseCase.execute(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      return res.status(200).json(result.value);
    } catch (error) {
      return res.status(400).json({
        error: `An error occurred, ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  @GET()
  async listCustomers(_req: Request, res: Response) {
    try {
      const result = await this.listCustomersUseCase.execute();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: `An error occurred, ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }
}
