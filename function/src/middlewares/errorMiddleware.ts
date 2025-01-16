import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};

export default errorHandler;
