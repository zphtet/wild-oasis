import CabinTable from "../components/CabinTable";
import AddCabin from "../components/AddCabin";
import { CabinType } from "../types/types";
import { useGetCabins } from "../hooks/useCabins";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FilterCabin from "../components/FilterCabin";
import SortCabin from "../components/SortCabin";
const Cabins = () => {
  const { isError, isLoading, data } = useGetCabins();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  console.log(data);
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
        <CabinTable data={data as CabinType[]} />
      </div>
      <AddCabin />
    </div>
  );
};

export default Cabins;
