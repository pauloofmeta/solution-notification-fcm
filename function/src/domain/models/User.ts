export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
  active: boolean;
}

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

export interface IUserInput {
  name: string;
  email: string;
  passwordHash: string;
  active?: boolean;
}
