import { SettingType } from "../types/types";
import supabase from "./supabase";

export const getSettings = async () => {
  const { data: setting, error } = await supabase.from("setting").select("*");
  if (error) {
    throw new Error("Error fetching settings");
  }
  return { setting, error };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateSettings = async (updateObj: Partial<SettingType>) => {
  const { data, error } = await supabase
    .from("setting")
    .update(updateObj)
    .eq("id", 1)
    .select();

  if (error) {
    throw new Error("Error updating setting");
  }
  return data;
};
