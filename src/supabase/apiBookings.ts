import supabase from "./supabase";
type Props = {
  status?: string;
};
// { status }: Props
export const getAllBookings = async ({ status }: Props) => {
  let query = supabase
    .from("bookings")
    .select("*,cabins(name,regularPrice),guests(fullName,email)");

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { error, data } = await query;
  if (error) {
    throw new Error("Error fetching all bookings");
  }
  return data;
};
