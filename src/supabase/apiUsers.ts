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

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateUser = async ({ password, name }: Partial<NewUserType>) => {
  console.log(password, name, "password and name");
  const { data, error } = await supabase.auth.updateUser({
    password: password,
    data: { name: name },
  });
  if (error) throw new Error("Error updating account");
  return data;
};
