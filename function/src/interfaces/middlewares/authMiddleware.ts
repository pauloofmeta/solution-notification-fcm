import { TokenService } from '@domain/ports';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Is Public?', req.isPublic);
  if (req.isPublic) {
    return next();
  }

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    res.status(401).json({ error: 'Access denied, no token provided' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res
      .status(400)
      .json({ error: 'Invalid token format. Use: Bearer <token>' });
    return;
  }

  const token = parts[1];
  const tokenService = req.container?.resolve<TokenService>('tokenService');
  const result = tokenService?.validate(token);
  if (!result?.success) {
    res
      .status(401)
      .json({ error: result?.message || 'Invalid or expired token' });
    return;
  }

  req.userId = result.value?.id;
  next();
};

export default authMiddleware;
