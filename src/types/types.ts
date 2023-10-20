export type FormInputs = {
  name: string;
  price: number;
  discount: number;
  capacity: number;
  message: string;
  image: string;
};

export type CabinType = {
  id: number;
  created_at: Date;
  regularPrice: number;
  discount: number;
  image: string;
  maxCapacity: number;
  name: string;
  description: string;
};
