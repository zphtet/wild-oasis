import {
  LogInUser,
  getUser,
  signUpUser,
  updateUser,
} from "../supabase/apiUsers";

import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginUser = () => {
  const { isPending, mutate: LoginByEmailPassword } = useMutation({
    mutationFn: LogInUser,
  });

  return {
    isPending,
    LoginByEmailPassword,
  };
};

export const useGetUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    data,
    isError,
    isLoading,
    isAuthenticated: data?.role === "authenticated",
  };
};

export const useSignUpUser = () => {
  const { isPending, mutate: signUpUserEmail } = useMutation({
    mutationFn: signUpUser,
  });

  return {
    isPending,
    signUpUserEmail,
  };
};

export const useUpdateUser = () => {
  const { isPending, mutate: updateUserAccount } = useMutation({
    mutationFn: updateUser,
  });

  return {
    isPending,
    updateUserAccount,
  };
};
