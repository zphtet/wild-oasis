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

export type SettingType = {
  id: number;
  created_at: Date;
  minBookLength: number;
  maxBookLength: number;
  maxGuestPerCabin: number;
  breakfastPrice: number;
};
