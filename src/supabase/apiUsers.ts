import { NewUserType } from "../types/types";
import supabase from "./supabase";
export const LogInUser = async ({ email, password }: Partial<NewUserType>) => {
  console.log(email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email!,
    password: password!,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
