import { NewUserType } from "../types/types";
import supabase from "./supabase";
export const LogInUser = async ({ email, password }: Partial<NewUserType>) => {
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

export const signUpUser = async ({
  email,
  password,
  name,
}: Partial<NewUserType>) => {
  const { data, error } = await supabase.auth.signUp({
    email: email!,
    password: password!,
    options: {
      data: {
        name,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
