import {
  getAllCabins,
  createNewCabin,
  deleteCabin,
} from "../supabase/apiCabins";

import { useQuery, useMutation } from "@tanstack/react-query";
export const useGetCabins = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useCreateCabin = () => {
  const { isPending, mutate: createCabin } = useMutation({
    mutationFn: createNewCabin,
  });

  return {
    createCabin,
    isPending,
  };
};

export const useDeleteCabin = () => {
  const { isPending, mutate: deleteCabinById } = useMutation({
    mutationFn: deleteCabin,
  });
  return {
    deleteCabinById,
    isPending,
  };
};
