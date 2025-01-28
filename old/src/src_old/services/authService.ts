import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginModel, Result } from "../models";
import userModel from "../models/userModel";
import { enviroments } from "../config";

const login = async ({
  email,
  password,
}: LoginModel): Promise<Result<string>> => {
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return {
      success: false,
      message: "Authtentication failed, email or password invalid!",
    };
  }

  const token = jwt.sign({ id: user._id }, enviroments.jwtSecret, {
    expiresIn: "4h",
  });
  return {
    success: true,
    value: token,
  };
};

const verifyAuth = (token: string): Result<{ id: string }> => {
  try {
    const decoded = jwt.verify(token, enviroments.jwtSecret) as { id: string };
    return {
      success: true,
      value: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: "Authteication failed, invalid token!",
    };
  }
};

export default {
  login,
  verifyAuth,
};
