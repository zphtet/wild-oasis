import { getSettings, updateSettings } from "../supabase/apiSettings";
import { useQuery, useMutation } from "@tanstack/react-query";
export const useGetSettings = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isError,
    isLoading,
    data,
  };
};

export const useUpdateSettings = () => {
  const { isPending, mutate: updateSetting } = useMutation({
    mutationFn: updateSettings,
  });

  return {
    isPending,
    updateSetting,
  };
};
