import { IUser } from '@domain/models';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    passwordHash: { type: String, required: true, minlength: 6 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('users', UserSchema);
