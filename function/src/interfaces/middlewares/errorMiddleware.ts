/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`Ops!, Occurs internal error: ${err.message}`, err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
