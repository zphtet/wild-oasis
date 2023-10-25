import { BookingType } from "../types/types";
import { formatCreatedDate, formatDate } from "../utils/helper";
type BookingProps = {
  booking: BookingType;
};
const BookingTableRow = ({ booking }: BookingProps) => {
  // console.log(booking);
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
  } = booking;

  const price = hasBreakfast ? numNights * 15 + totalPrice : totalPrice;

  const statusStyle =
    status === "unconfirmed"
      ? "bg-red-400"
      : status === "checked-in"
      ? "bg-green-400"
      : "bg-gray-200";

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
            className={`border w-max px-3 py-1 rounded-3xl text-black ${statusStyle}`}
          >
            {status}
          </p>
        </td>
        <td className="px-1 py-4">${price}</td>
        <td className="px-4 py-4   table-cell h-full text-right ">...</td>
      </tr>
    </>
  );
};

export default BookingTableRow;
