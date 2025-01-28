import mongoose, { Schema } from 'mongoose';
import { IAddress, ICustomer } from '@domain/models';

const AddressSchema: Schema = new Schema<IAddress>({
  street: { type: String, required: true },
  adtional: { type: String, required: false },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
});

const CustumerSchema: Schema = new Schema<ICustomer>(
  {
    name: { type: String, required: true, minlength: 3 },
    identifier: { type: String, required: false },
    address: { type: AddressSchema, required: true },
    contacts: [
      {
        type: {
          type: String,
          require: true,
          enum: ['phone', 'email', 'social'],
        },
        value: { type: String, require: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>('custumers', CustumerSchema);
