import { useSearchParams } from "react-router-dom";

const FilterBtn = ({
  name,
  setPage,
}: {
  name: string;
  setPage: boolean;
  section?: "booking" | "cabin" | "dashboard";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clickHandler = () => {
    setSearchParams((params) => {
      params.set("filter", name.toLocaleLowerCase());
      if (setPage) {
        params.set("page", "1");
      }

      return params;
    });
  };

  const filterVal = searchParams.get("filter");

  let menuActive =
    (filterVal === null && name.toLocaleLowerCase() === "all") ||
    name.toLocaleLowerCase() === "7days";
  if (filterVal) {
    menuActive = filterVal === name.toLocaleLowerCase();
  }

  return (
    <button
      onClick={clickHandler}
      disabled={menuActive}
      className={`px-3 py-1 text-sm  hover:bg-violet-600 rounded-md hover:text-white ${
        menuActive && "bg-violet-600 text-white cursor-not-allowed"
      }`}
    >
      {name}
    </button>
  );
};

export default FilterBtn;
