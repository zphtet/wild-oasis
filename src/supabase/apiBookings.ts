import supabase from "./supabase";
import { SIZE_PER_PAGE } from "../utils/constant";
import { BookingType } from "../types/types";

type Props = {
  status?: string;
  sortby?: string;
  page?: number;
};
// { status }: Props
export const getAllBookings = async ({ status, sortby, page }: Props) => {
  let query = supabase
    .from("bookings")
    .select("*,cabins(name,regularPrice),guests(fullName,email)", {
      count: "exact",
    });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (sortby) {
    const field = sortby.split("-")[0];
    const direction = sortby.split("-")[1] === "asc";
    query = query.order(field, { ascending: direction });
  }

  const skip = (page! - 1) * SIZE_PER_PAGE;
  const final = page! * SIZE_PER_PAGE - 1;
  if (page) {
    query = query.range(skip, final);
  }
  const { error, data, count } = await query;
  if (error) {
    throw new Error("Error fetching all bookings");
  }
  return {
    data,
    count,
    skip,
    final,
  };
};

export const deleteBooking = async (id: number) => {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    throw new Error("Error deleting booking");
  }
  return {
    status: "success",
  };
};

export const getBooking = async (id: number) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("* , guests(*), cabins(name)")
    .eq("id", id);

  if (error) {
    throw new Error("Error getting booking");
  }
  return data;
};

export const updateBooking = async (obj: Partial<BookingType>) => {
  const updateObj = { ...obj };
  delete updateObj.id;
  const { data, error } = await supabase
    .from("bookings")
    .update(updateObj)
    .eq("id", obj.id)
    .select();

  if (error) {
    throw new Error("Error updating booking");
  }

  return data;
};

export const getBookingsStats = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error("Error getting bookings");
  return data;
};
