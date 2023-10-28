import { useGetUser } from "../hooks/useUsers";

type Props = {
  css?: string;
};
const Navbar = ({ css }: Props) => {
  const { data, isAuthenticated, isError, isLoading } = useGetUser();
  console.log(data, " user data navbar");
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
  return (
    <div className={`${css} dark:bg-color-grey-0`}>
      <div className="border border-blue-600 flex ">
        <button
          onClick={modeHandler}
          className="cursor-pointer px-3 py-1 border"
        >
          Mode
        </button>
        <p className=""> Hello {data?.user_metadata?.name}</p>
      </div>
    </div>
  );
};

export default Navbar;
