import bcrypt from "bcrypt";
import { Result } from "../models";
import UserModel, {
  IUser,
  IUserPayload,
  IUserResponse,
} from "../models/userModel";

const toResponse = ({
  name,
  email,
  createdAt,
  updatedAt,
  active,
}: IUser): IUserResponse => ({
  name,
  email,
  createdAt,
  updatedAt,
  active,
});

const generatePasswordHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const create = async ({
  email,
  password,
  name,
}: IUserPayload): Promise<Result<IUserResponse>> => {
  try {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return { success: false, message: "User with these email alredy exists" };
    }

    const passwordHash = await generatePasswordHash(password);
    const model = new UserModel({ name, email, passwordHash });
    const user = await model.save();
    return { success: !!user, value: toResponse(user) };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "";
    return {
      success: false,
      message: `Occurs an erro on create user! ${errorMessage}`,
    };
  }
};

const update = async (
  id: string,
  payload: IUserPayload
): Promise<IUser | null | undefined> => {
  const passwordHash = await generatePasswordHash(payload.password);
  const user = await UserModel.findByIdAndUpdate(id, {
    ...payload,
    passwordHash,
  });
  return user?.save();
};

const deleteById = (id: string): Promise<IUser | null> =>
  UserModel.findByIdAndDelete(id);

const getAll = async (): Promise<IUserResponse[]> => {
  const users = await UserModel.find();
  return users.map(toResponse);
};

const getById = async (id: string): Promise<IUserResponse | null> => {
  const user = await UserModel.findById(id);
  return !user ? null : toResponse(user);
};

export default {
  create,
  update,
  deleteById,
  getAll,
  getById,
};
