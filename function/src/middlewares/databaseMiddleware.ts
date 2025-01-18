import { NextFunction, Request, Response } from "express";
import database from "../config/database";

const databaseMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const connected = await database.connectToDataBase();
  if (connected) {
    next();
    return;
  }
  res.status(500).json({
    title: "Cannot connect to Database",
    message: "MongoDB fail on connect!",
  });
};

export default databaseMiddleware;
