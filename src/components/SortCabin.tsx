import { ChangeEvent } from "react";

import { useSearchParams } from "react-router-dom";
const SortByArr = [
  {
    id: 1,
    name: "Sort By Name (A - Z)",
    field: "name",
    modifier: "asc",
  },
  {
    id: 2,
    name: "Sort By Name (Z - A)",
    field: "name",
    modifier: "desc",
  },
  {
    id: 3,
    name: "Sort By Price (asc)",
    field: "regularPrice",
    modifier: "asc",
  },
  {
    id: 4,
    name: "Sort By Price (desc)",
    field: "regularPrice",
    modifier: "desc",
  },
  {
    id: 5,
    name: "Sort By Capacity (asc)",
    field: "maxCapacity",
    modifier: "asc",
  },
  {
    id: 6,
    name: "Sort By Capacity (desc)",
    field: "maxCapacity",
    modifier: "desc",
  },
];

const SortCabin = () => {
  //   const ref = useRef<HTMLSelectElement>();
  const [searchParams, setSearchParams] = useSearchParams();

  const changeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setSearchParams((param) => {
      param.set("sortby", target.value);
      return param;
    });
  };

  const activeSort = searchParams.get("sortby") || "name-asc";

  const filterActiveSort = SortByArr.filter(({ field, modifier }) => {
    return activeSort === `${field}-${modifier}`;
  });

  return (
    <div>
      <select
        name="sortby"
        id="sortby"
        className="text-sm outline-none px-3 py-2"
        onChange={changeHandler}
        // value={filterActiveSort[0].name}
        //   defaultValue={filterActiveSort[0].}
        value={`${filterActiveSort[0].field}-${filterActiveSort[0].modifier}`}
      >
        {SortByArr.map(({ id, name, field, modifier }) => {
          return (
            <option
              key={id}
              //   selected={activeSort === `${field}-${modifier}`}
              value={`${field}-${modifier}`}
              //   value={name}
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortCabin;
