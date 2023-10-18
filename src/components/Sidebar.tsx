import NavItem from "./NavItem";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiWarehouse } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";

type Props = {
  css?: string;
};
const Sidebar = ({ css }: Props) => {
  return (
    <div className={`${css} bg-white  dark:bg-color-grey-0 `}>
      <div className="max-w-[150px]">
        <img
          src={"logo-light.png"}
          className="w-full object-contain"
          alt="logo"
        />
      </div>
      <nav className="py-5 space-y-2">
        <NavItem text="Home" icon={<AiOutlineHome />} to="dashboard" />
        <NavItem text="Bookings" icon={<AiOutlineCalendar />} to="booking" />
        <NavItem text="Cabins" icon={<PiWarehouse />} to="cabins" />
        <NavItem text="Users" icon={<HiOutlineUsers />} to="users" />
        <NavItem text="Setting" icon={<AiOutlineSetting />} to="setting" />
      </nav>
    </div>
  );
};

export default Sidebar;
