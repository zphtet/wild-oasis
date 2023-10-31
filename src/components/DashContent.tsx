import Stat from "./Stat";
import LineChart from "./LineChart";
import { useGetBookingsStats } from "../hooks/useBookings";
import Error from "./Error";
import Loading from "./Loading";
import { formatPrice, getKey } from "../utils/helper";
import { GoBriefcase } from "react-icons/go";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";

interface MonthKeys<T> {
  [key: string]: T;
}
const DashContent = () => {
  const { data, isError, isLoading } = useGetBookingsStats();
  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  const numCheckedIn = data?.filter(
    (book) => book.status === "checked-in"
  ).length;
  const totalSales = data
    ?.filter((book) => book.isPaid === true)
    .reduce((accum, value) => accum + value.totalPrice, 0);

  const byMonths = {} as MonthKeys<{ price?: number }>;
  data?.forEach((book) => {
    const key = getKey(book.created_at);
    if (!byMonths[key]) {
      byMonths[key] = { price: book.totalPrice };
      return;
    }
    byMonths[key].price += book.totalPrice;
  });

  const chartDataArr = Object.keys(byMonths).map((key) => {
    return {
      name: key,
      sale: byMonths[key].price!,
    };
  });
  return (
    <div className="py-5">
      <div className="stats flex gap-5">
        <Stat
          text="Bookings"
          num={data!.length}
          icon={<GoBriefcase className="text-2xl fill-violet-600" />}
        />
        <Stat
          text="Sales"
          num={`${formatPrice(totalSales)}`}
          icon={<AiOutlineDollarCircle className="text-2xl fill-green-600" />}
        />
        <Stat
          text="Check-ins"
          num={numCheckedIn!}
          icon={<IoIosPeople className="text-2xl fill-blue-600" />}
        />
      </div>

      <LineChart data={chartDataArr} />
    </div>
  );
};

export default DashContent;
