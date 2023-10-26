import { useGetBookings } from "../hooks/useBookings";
import BookingTableRow from "./BookingTableRow";
import Error from "./Error";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { SIZE_PER_PAGE } from "../utils/constant";
const BookingTable = () => {
  const { isError, isLoading, data } = useGetBookings();
  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  const bookings = data?.data;
  const totalCount = data?.count;
  const start = data?.skip;
  const end = start! + bookings!.length - 1;

  return (
    <>
      <div className="relative  fflex items-center justify-center z-50 ">
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
      {totalCount! > SIZE_PER_PAGE && (
        <Pagination total={totalCount!} start={start!} end={end} />
      )}
    </>
  );
};

export default BookingTable;
