import supabase, { supabaseUrl } from "./supabase";
import { CabinType } from "../types/types";
export const getAllCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Error fetching all cabins");
  }
  return data;
};

const cabinImagPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;
export const createNewCabin = async (newCabin: CabinType) => {
  const modifiedCabin = {
    ...newCabin,
    image: "image url",
  };
  const isAlreadyImageUrl = typeof newCabin.image === "string";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cabinImage = newCabin.image[0] as any;
  const imgName = `${Math.random()}-${cabinImage.name}`.replace("/", "");
  if (!isAlreadyImageUrl) {
    const { error } = await supabase.storage
      .from("cabin-images")
      .upload(imgName, cabinImage);

    if (error) {
      throw new Error("Imag colud not uploaded");
    }
  }
  modifiedCabin.image = isAlreadyImageUrl
    ? newCabin.image
    : `${cabinImagPath}${imgName}`;

  const { data, error: uploadError } = await supabase
    .from("cabins")
    .insert([modifiedCabin])
    .select();
  if (uploadError) {
    throw new Error("Error Creating new Cabin");
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Error deleting cabin");
  }
  return {
    status: "success",
  };
};

export const updateCabin = async (updateCabin: CabinType) => {
  const updateObj = {
    ...updateCabin,
  };
  delete updateObj.id;

  const isAlreadyImageUrl = typeof updateObj.image === "string";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cabinImage = updateObj.image[0] as any;
  const imgName = `${Math.random()}-${cabinImage.name}`.replace("/", "");
  if (!isAlreadyImageUrl) {
    const { error } = await supabase.storage
      .from("cabin-images")
      .upload(imgName, cabinImage);

    if (error) {
      throw new Error("Imag colud not uploaded");
    }
  }

  updateObj.image = isAlreadyImageUrl
    ? updateCabin.image
    : `${cabinImagPath}${imgName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update(updateObj)
    .eq("id", updateCabin.id)
    .select();

  if (error) {
    throw new Error("Error updating cabin");
  }
  return data;
};
