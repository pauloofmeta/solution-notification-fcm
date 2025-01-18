import mongoose, { Schema, Types } from "mongoose";

export interface IAddress {
  street: string;
  adtional?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface IContact {
  type: "phone" | "email" | "social";
  value: string;
}

export interface ICustumer {
  _id: Types.ObjectId;
  name: string;
  identifier?: string;
  address: IAddress;
  contacts?: IContact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustumerPayload {
  name: string;
  identifier?: string;
  address: IAddress;
  contacts?: IContact[];
}

const AddressSchema: Schema = new Schema<IAddress>({
  street: { type: String, required: true },
  adtional: { type: String, required: false },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
});

const CustumerSchema: Schema = new Schema<ICustumer>(
  {
    name: { type: String, required: true, minlength: 3 },
    identifier: { type: String, required: false },
    address: { type: AddressSchema, required: true },
    contacts: [
      {
        type: {
          type: String,
          require: true,
          enum: ["phone", "email", "social"],
        },
        value: { type: String, require: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustumer>("custumers", CustumerSchema);
