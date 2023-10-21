// export type FormInputs = {
//   regularPrice: number;
//   discount: number;
//   image: string;
//   maxCapacity: number;
//   name: string;
//   description: string;
// };

export type CabinType = {
  id?: number;
  created_at?: Date;
  regularPrice: number;
  discount: number;
  image: string;
  maxCapacity: number;
  name: string;
  description: string;
};

// export type DuplicateCabinType = CabinType & {
//   id?: number;
// };
