import { getAllCabins } from "../supabase/apiCabins";
import { useQuery } from "@tanstack/react-query";
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
