import { LoginUseCase } from '@application/usecases/auth/LoginUseCase';
import { CreateUserUseCase } from '@application/usecases/user/CreateUserUseCase';
import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  @route('/register')
  @POST()
  async register(req: Request, res: Response): Promise<void> {
    const result = await this.createUserUseCase.execute(req.body);
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.status(201).json(result.value);
  }

  @route('/login')
  @POST()
  async login(req: Request, res: Response): Promise<void> {
    const result = await this.loginUseCase.execute(req.body);
    if (!result.success) {
      res.status(401).json(result);
      return;
    }
    res.json(result.value);
  }
}
