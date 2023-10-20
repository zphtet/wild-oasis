import supabase, { supabaseUrl } from "./supabase";
import { FormInputs } from "../types/types";
export const getAllCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Error fetching all cabins");
  }
  return data;
};

const cabinImagPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;
export const createNewCabin = async (newCabin: FormInputs) => {
  const modifiedCabin = {
    image: "image url",
    maxCapacity: newCabin.capacity,
    regularPrice: newCabin.price,
    name: newCabin.name,
    discount: newCabin.discount,
    description: newCabin.message,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cabinImage = newCabin.image[0] as any;
  const imgName = `${Math.random()}-${cabinImage.name}`.replace("/", "");
  const { error } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, cabinImage);

  if (error) {
    throw new Error("Imag colud not uploaded");
  }

  modifiedCabin.image = `${cabinImagPath}${imgName}`;

  const { data, error: uploadError } = await supabase
    .from("cabins")
    .insert([modifiedCabin])
    .select();
  if (uploadError) {
    throw new Error("Error Creating new Cabin");
  }
  console.log(data);

  return data;
};
