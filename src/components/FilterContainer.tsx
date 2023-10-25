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

const FilterCabin = ({ section }: { section: string }) => {
  const Arr = section === "booking" ? filterByArrBooking : filterByArrCabin;
  return (
    <div className="bg-white px-3 py-1 space-x-2 dark:bg-color-grey-0">
      {Arr.map(({ id, name }) => {
        return <FilterBtn key={id} name={name} />;
      })}
    </div>
  );
};

export default FilterCabin;
