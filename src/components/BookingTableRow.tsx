import { BookingType } from "../types/types";
import { formatCreatedDate, formatDate } from "../utils/helper";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import {
  AiFillEye,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignTop,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "../hooks/useBookings";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBooking } from "../hooks/useBookings";
import { formatPrice } from "../utils/helper";
type BookingProps = {
  booking: BookingType;
};
const BookingTableRow = ({ booking }: BookingProps) => {
  const [actionActive, setActionActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { deleteBookingById } = useDeleteBooking();
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateBookingById } = useUpdateBooking();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    cabins,
    guests,
    totalPrice,
    startDate,
    endDate,
    created_at,
    status,
    numNights,
    hasBreakfast,
    numGuests,
    id,
  } = booking;

  const price = hasBreakfast
    ? numNights * numGuests * 5 + totalPrice
    : totalPrice;

  const statusStyle =
    status === "unconfirmed"
      ? "bg-red-400"
      : status === "checked-in"
      ? "bg-green-400"
      : "bg-gray-200";

  const focusHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setActionActive((prev) => !prev);
    if (actionActive) {
      target.focus();
    }
  };
  const routeToDetail = () => {
    navigate(`/booking/detail/${booking.id}`);
  };
  const checkInHandler = () => {
    navigate(`/booking/check/${booking.id}`);
  };

  const deleteHandler = () => {
    setIsDeleting((prev) => !prev);
    deleteBookingById(booking.id, {
      onSuccess: () => {
        toast.success("Successfully deleted");
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast.error("Error deleting booking");
      },
      onSettled: () => {
        setShowModal(false);
      },
    });
  };

  const checkoutHandler = () => {
    updateBookingById(
      {
        id: id,
        status: "checked-out",
      },
      {
        onSuccess: () => {
          toast.success("Successfully updated");
          queryClient.invalidateQueries({ queryKey: ["booking", id] });
          navigate("/booking");
        },
        onError: () => {
          toast.error("Error updating booking");
        },
      }
    );
  };

  const isCheckout = booking.status === "checked-out";
  const isCheckIn = booking.status === "checked-in";
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white table-cell  "
        >
          {cabins.name}
        </th>
        <td className=" px-1 py-4">
          <p className="font-bold text-base">{guests.fullName}</p>
          <p className="text-sm text-gray-400">{guests.email}</p>
        </td>
        <td className=" px-1 py-4">
          <p className="text-base font-extrabold">
            {formatCreatedDate(created_at)} → {numNights} night stay
          </p>
          <p className="text-sm">
            {formatDate(startDate)} — {formatDate(endDate)}
          </p>
        </td>
        <td className="px-1 py-4 ">
          <p
            className={`border w-max px-3 py-1 rounded-3xl text-white ${statusStyle}`}
          >
            {status}
          </p>
        </td>
        <td className="px-1 py-4">{formatPrice(price)}</td>
        <td className="px-4 py-4   table-cell h-full text-right  ">
          <button
            onClick={focusHandler}
            className="cursor-pointer w-max p-2 relative bg-slate-100 focus:outline-1 focus:outline-violet-600 focus:bg-slate-200 focus:border focus:border-violet-600 rounded dark:bg-color-grey-0"
          >
            <BiDotsVerticalRounded className=" text-xl" />

            {actionActive && (
              <div className="absolute right-[100%] -bottom-[200%]  bg-slate-100  rounded space-y-1 p-1 dark:bg-color-grey-0 w-max">
                <div onClick={routeToDetail} className="action-btn booking">
                  {" "}
                  <AiFillEye /> see details
                </div>
                {!isCheckout && !isCheckIn && (
                  <div className="action-btn booking" onClick={checkInHandler}>
                    {" "}
                    <AiOutlineVerticalAlignBottom /> check in
                  </div>
                )}
                {isCheckIn && (
                  <div className="action-btn booking" onClick={checkoutHandler}>
                    {" "}
                    <AiOutlineVerticalAlignTop /> check out
                  </div>
                )}

                <div
                  className="action-btn booking"
                  onClick={() => setShowModal(true)}
                >
                  {" "}
                  <RiDeleteBinLine /> delete
                </div>
              </div>
            )}
          </button>
        </td>
      </tr>
      {showModal && (
        <ConfirmDelete
          closeModal={setShowModal}
          isLoading={isDeleting}
          handler={deleteHandler}
        />
      )}
    </>
  );
};

export default BookingTableRow;
