import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const AppLayout = () => {
  return (
    <div className="grid gap-5 border  min-h-screen grid-cols-[min(200px,50%)_1fr] grid-rows-[70px_1fr] text-gray-700 dark:text-white dark:bg-color-grey-50">
      <Sidebar css="border row-span-full p-5" />
      <Navbar css="border p-5" />
      <main className="border p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
