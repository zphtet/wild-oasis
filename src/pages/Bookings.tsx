import BookingTable from "../components/BookingTable";
import FilterBooking from "../components/FilterContainer";
import SortBooking from "../components/SortContainer";
const Booking = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">All Bookings</h2>
        <div className="flex items-center gap-4">
          <FilterBooking section="booking" />
          <SortBooking section="booking" />
        </div>
      </div>
      <div className="mt-5">
        <BookingTable />
      </div>
    </div>
  );
};

export default Booking;
