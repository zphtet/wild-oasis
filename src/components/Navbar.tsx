import toast from "react-hot-toast";
import { useGetUser } from "../hooks/useUsers";
import { signOutUser } from "../supabase/apiUsers";
import { Link, useNavigate } from "react-router-dom";
type Props = {
  css?: string;
};
const Navbar = ({ css }: Props) => {
  const { data, isAuthenticated } = useGetUser();

  const navigate = useNavigate();
  const modeHandler = () => {
    if (!document.body.className) {
      document.body.className = "dark";
      return;
    }
    if (document.body.className) {
      document.body.className = "";
      return;
    }
  };
  const signOuHandler = async () => {
    alert("sign out");
    await signOutUser();
    toast.success("sign out successfully");
    navigate("/login");
  };
  return (
    <div className={`${css} dark:bg-color-grey-0`}>
      <div className="border border-blue-600 flex ">
        <button
          onClick={modeHandler}
          className="cursor-pointer px-3 py-1 border"
        >
          Mode
        </button>
        <p className="">
          {" "}
          Hello {isAuthenticated && data?.user_metadata?.name}
        </p>
        {isAuthenticated && (
          <button className="btn" onClick={signOuHandler}>
            Sign Out
          </button>
        )}
        {isAuthenticated && <Link to={"/account"}>Account Page</Link>}
      </div>
    </div>
  );
};

export default Navbar;
