import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
const AppLayout = () => {
  return (
    <div className="grid    h-screen md:grid-cols-[min(200px,50%)_1fr] grid-cols-[min(80px,50%)_1fr] grid-rows-[50px_1fr] text-gray-700 dark:text-white dark:bg-color-grey-50">
      <Toaster />
      <Sidebar css=" row-span-full px-1 py-3 md:p-5" />
      <Navbar css=" " />
      <main className=" p-5   overflow-x-scroll overflow-y-scroll bg-gray-100 dark:bg-color-grey-50 ">
        <div className=" min-w-[820px]  ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
