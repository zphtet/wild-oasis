import FilterBtn from "./FilterBtn";
const filterByArr = [
  { id: 1, name: "All" },
  { id: 2, name: "Discount" },
  { id: 3, name: "No-Discount" },
];

const FilterCabin = () => {
  return (
    <div className="bg-white px-3 py-1 space-x-2">
      {filterByArr.map(({ id, name }) => {
        return <FilterBtn key={id} name={name} />;
      })}
    </div>
  );
};

export default FilterCabin;
