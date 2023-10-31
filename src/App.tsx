import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const AppLayout = lazy(() => import("./components/AppLayout"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Setting = lazy(() => import("./pages/Setting"));
const BookingDetail = lazy(() => import("./components/BookingDetail"));
const Login = lazy(() => import("./pages/Login"));
const ProtectRoutes = lazy(() => import("./components/ProtectRoutes"));
const Account = lazy(() => import("./pages/Account"));
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectRoutes>
              <AppLayout />
            </ProtectRoutes>
          }
        >
          <Route index element={<Navigate replace to="/dashboard" />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/booking" element={<Bookings />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/booking/detail/:bookingId"
            element={<BookingDetail />}
          />
          <Route
            path="/booking/check/:bookingId"
            element={<BookingDetail isChecking={true} />}
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
