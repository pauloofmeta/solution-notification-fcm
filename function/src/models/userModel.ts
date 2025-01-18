import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

export interface IUserResponse {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    passwordHash: { type: String, required: true, minlength: 6 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("users", UserSchema);
