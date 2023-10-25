import { getAllBookings } from "../supabase/apiBookings";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
export const useGetBookings = () => {
  const [searchParams] = useSearchParams();

  let filterValue = searchParams.get("filter") || "all";
  filterValue =
    filterValue === "in"
      ? "checked-in"
      : filterValue === "out"
      ? "checked-out"
      : filterValue === "all"
      ? "all"
      : "unconfirmed";

  const { isError, isLoading, data } = useQuery({
    queryKey: ["bookings", filterValue],
    queryFn: () => getAllBookings({ status: filterValue }),
  });

  return {
    data,
    isError,
    isLoading,
  };
};
