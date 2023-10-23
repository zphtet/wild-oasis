import CabinTable from "../components/CabinTable";
import AddCabin from "../components/AddCabin";
import { CabinType } from "../types/types";
import { useGetCabins } from "../hooks/useCabins";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FilterCabin from "../components/FilterCabin";
import SortCabin from "../components/SortCabin";
import { useSearchParams } from "react-router-dom";
const Cabins = () => {
  const { isError, isLoading, data } = useGetCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  const filter = searchParams.get("filter") || "all";
  const sortBy = searchParams.get("sortby") || "created_at-asc";
  const field = sortBy.split("-")[0];
  const cabins = data;
  const modifierStr = sortBy.split("-")[1];
  const modifier =
    modifierStr === undefined ? -1 : modifierStr === "asc" ? 1 : -1;

  const filteredCabins = cabins!.filter((cabin) => {
    if (filter === "discount") {
      return cabin.discount > 0;
    }
    if (filter === "no-discount") return cabin.discount === 0;
    return cabin;
  });

  const sortedCabins = filteredCabins.sort((a, b) => {
    const aValue = a[field] || a["created_at"];
    const bValue = b[field] || b["created_at"];

    if (typeof aValue == "string") {
      return aValue.localeCompare(bValue) * modifier;
    }

    return (aValue - bValue) * modifier;
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">All Cabins</h2>
        <div className="flex gap-4 items-center">
          <FilterCabin />
          <SortCabin />
        </div>
      </div>

      <div className="cabin-table py-2 md:py-6  w-full ">
        <CabinTable data={sortedCabins as CabinType[]} />
      </div>
      <AddCabin />
    </div>
  );
};

export default Cabins;
