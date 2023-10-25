import { useGetBookings } from "../hooks/useBookings";
import BookingTableRow from "./BookingTableRow";
import Error from "./Error";
import Loading from "./Loading";

const BookingTable = () => {
  const { isError, isLoading, data: bookings } = useGetBookings();

  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  console.log(bookings);

  return (
    <div className="relative  fflex items-center justify-center ">
      <table className=" w-full max-w-full  text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Cabins
            </th>
            <th scope="col" className="px-1 py-3">
              Guest
            </th>
            <th scope="col" className="px-1 py-3">
              Dates
            </th>
            <th scope="col" className="px-1 py-3">
              Status
            </th>
            <th scope="col" className="px-1 py-3">
              Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings!.map((booking) => {
            return <BookingTableRow key={booking.id} booking={booking} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
