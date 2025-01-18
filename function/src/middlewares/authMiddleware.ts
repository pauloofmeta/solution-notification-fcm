import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "Access denied, no token provided" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res
      .status(400)
      .json({ error: 'Invalid token format. Use "Bearer <token>"' });
    return;
  }

  const token = parts[1];
  const result = authService.verifyAuth(token);
  if (!result.success) {
    res
      .status(401)
      .json({ error: result.message || "Invalid or expired token" });
    return;
  }

  (req as any).userId = result.value?.id;
  next();
};

export default authMiddleware;
