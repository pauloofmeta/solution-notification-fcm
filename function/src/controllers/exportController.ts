import { Request, Response } from "express";

const createRequest = async (req: Request, res: Response): Promise<void> => {
  res.status(201).json({});
};

const getRequests = async (req: Request, res: Response): Promise<void> => {
  res.json({});
};

export default {
  createRequest,
  getRequests,
};
