export interface IAddress {
  street: string;
  adtional?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface IContact {
  type: 'phone' | 'email' | 'social';
  value: string;
}

export interface ICustomer {
  id: string;
  name: string;
  identifier?: string;
  address: IAddress;
  contacts?: IContact[];
  createdAt: Date;
  updatedAt?: Date;
}
