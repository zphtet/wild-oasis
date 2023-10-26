import {
  getAllBookings,
  deleteBooking,
  getBooking,
  updateBooking,
} from "../supabase/apiBookings";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useGetBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // filter value
  let filterValue = searchParams.get("filter") || "all";
  filterValue =
    filterValue === "in"
      ? "checked-in"
      : filterValue === "out"
      ? "checked-out"
      : filterValue === "all"
      ? "all"
      : "unconfirmed";

  // sort by
  const sortBy = searchParams.get("sortby") || "created_at-asc";

  // page

  const pageNum = +searchParams.get("page")! || 1;

  const { isError, isLoading, data } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, pageNum],
    queryFn: () =>
      getAllBookings({ status: filterValue, sortby: sortBy, page: pageNum }),
  });

  if (pageNum >= 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, pageNum - 1],
      queryFn: () =>
        getAllBookings({
          status: filterValue,
          sortby: sortBy,
          page: pageNum - 1,
        }),
    });

    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, pageNum + 1],
      queryFn: () =>
        getAllBookings({
          status: filterValue,
          sortby: sortBy,
          page: pageNum + 1,
        }),
    });
  }

  return {
    data,
    isError,
    isLoading,
  };
};

export const useDeleteBooking = () => {
  const { isPending, mutate: deleteBookingById } = useMutation({
    mutationFn: deleteBooking,
  });

  return {
    isPending,
    deleteBookingById,
  };
};

export const useGetBooking = (id: number) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return {
    isError,
    isLoading,
    data,
  };
};

export const useUpdateBooking = () => {
  const { isPending, mutate: updateBookingById } = useMutation({
    mutationFn: updateBooking,
  });

  return { isPending, updateBookingById };
};
