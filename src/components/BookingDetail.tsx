import { useNavigate, useParams } from "react-router-dom";
import { useGetBooking } from "../hooks/useBookings";
import Error from "./Error";
import Loading from "./Loading";
import { MdOtherHouses } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { BookingType } from "../types/types";
import { formatDate2 } from "../utils/helper";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useUpdateBooking } from "../hooks/useBookings";
import { useQueryClient } from "@tanstack/react-query";
const BookingDetail = ({ isChecking }: { isChecking?: boolean }) => {
  const { bookingId } = useParams();
  const { data, isError, isLoading } = useGetBooking(Number(bookingId));
  const navigate = useNavigate();
  const { isPending, updateBookingById } = useUpdateBooking();
  const [confirm, setConfirm] = useState(false);
  const [inBrf, setInBrf] = useState(false);
  const confirmRef = useRef<HTMLInputElement>();
  const brfRef = useRef<HTMLInputElement>();
  const queryClient = useQueryClient();

  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  const {
    status,
    numNights,
    numGuests,
    isPaid,
    hasBreakfast,
    guests,
    totalPrice,
    startDate,
    endDate,
    id,
  } = data![0] as BookingType;

  const statusStyle =
    status === "unconfirmed"
      ? "bg-red-400"
      : status === "checked-in"
      ? "bg-green-400"
      : "bg-gray-200";

  const tPrice = totalPrice + numNights * numGuests * 5;
  const brfPrice = numNights * numGuests * 5;
  const isDonePayment = isPaid;
  const isBreakfast = hasBreakfast;
  const isCheckedIn = status === "checked-in";
  const isCheckedOut = status === "checked-out";

  const checkedInHandler = () => {
    navigate(`/booking/check/${id}`);
  };

  const backHandler = () => {
    if (confirm) {
      toast.error("Hey check in !", {
        iconTheme: {
          primary: "#fff",
          secondary: "#b15dde",
        },
      });
      return;
    }
    navigate(-1);
  };

  const confirmHandler = () => {
    if (confirmRef.current?.checked) {
      setConfirm(true);
      return;
    }
    setConfirm(false);
  };
  const brfHandler = () => {
    if (brfRef.current?.checked) {
      setInBrf(true);
      return;
    }
    setInBrf(false);
  };

  const checkInHandler = () => {
    updateBookingById(
      {
        id: id,
        totalPrice: inBrf || hasBreakfast ? tPrice : totalPrice,
        status: "checked-in",
        isPaid: true,
        hasBreakfast: hasBreakfast ? hasBreakfast : inBrf,
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
  return (
    <div className="  ">
      <div className="flex items-center gap-5">
        <p className="text-2xl font-bold">Bookinng #{bookingId}</p>
        <p
          className={`px-4 pb-0.5 border rounded-3xl text-sm text-white ${statusStyle}  ${
            confirm ? "bg-yellow-400 " : ""
          }`}
        >
          {confirm ? "confirmed" : status}
        </p>
      </div>
      <div className="bg-white pb-5 my-5 dark:bg-color-grey-0">
        <div className="bg-violet-600 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MdOtherHouses className="text-2xl" />
              <p> {numNights} nights in Cabin 006</p>
            </div>
            <p className="text-slate-200">
              {formatDate2(startDate)} — {formatDate2(endDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 py-5 px-5">
          <img
            src={guests.countryFlag}
            className="w-6 h-4 bg-gray-500"
            alt="flag"
          />
          <p>
            {guests.fullName} + {numGuests - 1} guests
          </p>
          <p className="opacity-80"> . {guests.email}</p>
          <p className="opacity-80">. National ID {guests.nationalID}</p>
        </div>
        <div className="flex gap-4 items-center px-5">
          <AiOutlineCheckCircle className="fill-violet-600" />
          <p>Breakfast Include?</p>
          <p>{isBreakfast || inBrf ? "Yes" : "No"}</p>
        </div>
        <div className="p-5">
          <div
            className={`bg-yellow-300/40 text-yellow-800 p-5 flex items-center justify-between dark:bg-yellow-300/80 ${
              isDonePayment || confirm
                ? "bg-green-300/40 text-green-800 dark:bg-green-300"
                : ""
            }`}
          >
            <p className="flex items-center gap-3">
              <AiOutlineDollarCircle />
              {isBreakfast || inBrf
                ? ` Total price ${tPrice}  ($${totalPrice}cabin + $${brfPrice}breakfast)`
                : `Total Price $${totalPrice}`}
            </p>
            <p>{isDonePayment || confirm ? "PAID" : "WILL PAY AT PROPERTY"}</p>
          </div>
        </div>
        <div className="flex justify-end px-5">
          <p className="text-sm opacity-70">Booked Mon, Sep 25 2023, 4:58 PM</p>
        </div>
      </div>

      {!isDonePayment && !isBreakfast && isChecking && (
        <div className="p-5 bg-white flex items-center gap-5 my-5 dark:bg-color-grey-0">
          <input
            ref={brfRef}
            id="breakfast"
            type="checkbox"
            className={`w-4 h-4 ${confirm && "opacity-50"}`}
            onClick={brfHandler}
            disabled={confirm}
          />
          <label htmlFor="breakfast">Want to Include Breakfast</label>
        </div>
      )}

      {isChecking && (
        <>
          <div className="p-5 bg-white flex items-center gap-5 my-5 dark:bg-color-grey-0">
            <input
              id="payment"
              ref={confirmRef}
              type="checkbox"
              className={`w-4 h-4 ${confirm && "opacity-50"}`}
              onClick={confirmHandler}
              disabled={confirm}
            />
            <label htmlFor="payment">
              I confirm that the price was received .
            </label>
          </div>
        </>
      )}

      <div className="flex gap-4 items-center justify-end px-5 my-5">
        {!isCheckedOut && !isCheckedIn && !isChecking && (
          <button className="btn" onClick={checkedInHandler}>
            Check In
          </button>
        )}
        {isChecking && (
          <button
            className={`btn ${
              (!confirm || isPending) && "opacity-80 cursor-not-allowed"
            }`}
            disabled={!confirm || isPending}
            onClick={checkInHandler}
          >
            Checking in #{id}
          </button>
        )}
        {isCheckedIn && (
          <button
            disabled={isPending}
            className={`btn ${isPending && "opacity-80 cursor-not-allowed"}`}
            onClick={checkoutHandler}
          >
            Check Out
          </button>
        )}
        {/* <button className="btn bg-red-600">Delete Booking</button> */}
        <button
          disabled={isPending}
          className={`btn bg-white text-slate-800 ${
            isPending && "cursor-not-allowed opacity-80"
          }`}
          onClick={backHandler}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
