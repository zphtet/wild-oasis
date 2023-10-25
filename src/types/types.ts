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

type GuestType = {
  fullName: string;
  email: string;
};

export type BookingType = {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: null | number;
  extraPrice: null | number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabinId: number;
  guestId: number;
  cabins: Partial<CabinType>;
  guests: GuestType;
};
