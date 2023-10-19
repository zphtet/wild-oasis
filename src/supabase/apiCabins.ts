import supabase from "./supabase";

export const getAllCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    return {
      status: "fail",
      err: error.message,
    };
  }
  return data;
};
