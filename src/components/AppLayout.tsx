import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
const AppLayout = () => {
  return (
    <div className="grid    h-screen grid-cols-[min(200px,50%)_1fr] grid-rows-[70px_1fr] text-gray-700 dark:text-white dark:bg-color-grey-50">
      <Toaster />
      <Sidebar css=" row-span-full p-5" />
      <Navbar css=" p-5" />
      <main className=" p-5  overflow-x-scroll overflow-y-scroll bg-gray-100 dark:bg-color-grey-50 ">
        <div className="w-[max(500px,100%)] ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
