import { ListUsersUseCase } from '@application/usecases/user/ListUsesUseCase';
import { authMiddleware } from '@interfaces/middlewares';
import { before, GET, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/users')
@before(authMiddleware)
export class UserController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  @GET()
  async register(_req: Request, res: Response): Promise<void> {
    const users = await this.listUsersUseCase.execute();
    res.json(users);
  }
}
