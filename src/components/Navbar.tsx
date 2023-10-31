import toast from "react-hot-toast";
import { useGetUser } from "../hooks/useUsers";
import { signOutUser } from "../supabase/apiUsers";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
type Props = {
  css?: string;
};
const Navbar = ({ css }: Props) => {
  const { data, isAuthenticated } = useGetUser();
  const [isDark, setDarkMode] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const modeHandler = () => {
    if (!document.body.className) {
      document.body.className = "dark";
      setDarkMode(true);
      return;
    }
    if (document.body.className) {
      document.body.className = "";
      setDarkMode(false);
      return;
    }
  };
  const signOuHandler = async () => {
    setLoading(true);
    await signOutUser();
    setLoading(false);
    toast.success("sign out successfully");
    navigate("/login");
  };
  return (
    <div
      className={`${css}  border-l dark:border-l-0 dark:bg-color-grey-0 flex items-center justify-center`}
    >
      <div className="flex flex-1 justify-end items-center gap-5 px-5">
        <p className=""> {isAuthenticated && data?.user_metadata?.name}</p>

        {isAuthenticated && (
          <Link to={"/account"}>
            <AiOutlineUser className="text-violet-600 text-2xl" />
          </Link>
        )}
        <button onClick={modeHandler}>
          {isDark ? (
            <BsSun className="text-violet-600 text-2xl" />
          ) : (
            <BsMoon className="text-violet-600 text-2xl" />
          )}
        </button>

        {isAuthenticated && (
          <button className="" onClick={signOuHandler} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner css="w-6 h-6 px-1 mx-0" />
            ) : (
              <MdOutlineLogout className="text-violet-600 text-2xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
