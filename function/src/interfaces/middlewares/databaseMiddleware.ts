import { Request, Response, NextFunction } from 'express';
import { MongoDatabase } from '@infrastructure/database/MongoDatabase';

const databaseMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await MongoDatabase.connect();
    next();
  } catch (error) {
    const dbError = new Error(
      `Failed to connect to the database. ${error instanceof Error ? error.message : ''}`
    );
    next(dbError);
  }
};

export default databaseMiddleware;
