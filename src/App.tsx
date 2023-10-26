import AppLayout from "./components/AppLayout";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Setting from "./pages/Setting";
import BookingDetail from "./components/BookingDetail";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Bookings />} />
          <Route
            path="/booking/detail/:bookingId"
            element={<BookingDetail />}
          />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/users" element={<Users />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
