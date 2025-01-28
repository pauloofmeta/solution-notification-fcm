import { Request, Response } from "express";
import userService from "../services/userService";
import authService from "../services/authService";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required" });
    return;
  }

  const result = await userService.create({ name, email, password });
  if (!result.success) {
    res.status(400).json({ error: result.message || "Error creating user" });
    return;
  }
  res
    .status(201)
    .json({ message: "User created successfully", user: result.value });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email, and password are required" });
    return;
  }

  const result = await authService.login({ email, password });
  if (!result.success) {
    res
      .status(401)
      .json({ message: result.message || "Email or Password invalid" });
    return;
  }

  res.json(result.value);
};

export default {
  register,
  login,
};
