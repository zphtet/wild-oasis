import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  text: string;
  icon: ReactNode;
  to: string;
};

const NavItem = ({ text, icon, to }: Props) => {
  return (
    <NavLink
      to={to}
      className="navlink hover:bg-gray-100  px-5 py-2 cursor-pointer flex items-center gap-2 text-base rounded dark:hover:bg-color-grey-50"
    >
      <div className=" text-xl icon ">{icon}</div>
      <p className="md:block hidden">{text}</p>
    </NavLink>
  );
};

export default NavItem;
