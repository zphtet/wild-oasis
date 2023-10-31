import FilterBtn from "./FilterBtn";
const filterByArrCabin = [
  { id: 1, name: "All" },
  { id: 2, name: "Discount" },
  { id: 3, name: "No-Discount" },
];

const filterByArrBooking = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "in",
  },
  {
    id: 3,
    name: "out",
  },
  {
    id: 4,
    name: "unconfirmed",
  },
];

const filterByArrDashboard = [
  {
    id: 1,
    name: "7days",
  },
  {
    id: 2,
    name: "30days",
  },
  {
    id: 3,
    name: "90days",
  },
];

const FilterCabin = ({
  section,
}: {
  section: "booking" | "cabin" | "dashboard";
}) => {
  const Arr =
    section === "booking"
      ? filterByArrBooking
      : section === "cabin"
      ? filterByArrCabin
      : filterByArrDashboard;
  return (
    <div className="bg-white px-3 py-1 space-x-2 dark:bg-color-grey-0">
      {Arr.map(({ id, name }) => {
        return (
          <FilterBtn
            key={id}
            name={name}
            setPage={section === "booking"}
            section={section}
          />
        );
      })}
    </div>
  );
};

export default FilterCabin;
