import { useParams } from "react-router-dom";
const BookingDetail = () => {
  const { bookingId } = useParams();
  return (
    <div className="border ">
      <p className="text-2xl font-bold">Bookinng #{bookingId}</p>
    </div>
  );
};

export default BookingDetail;
