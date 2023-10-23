import CabinTable from "../components/CabinTable";
import AddCabin from "../components/AddCabin";
import { CabinType } from "../types/types";
import { useGetCabins } from "../hooks/useCabins";
import Loading from "../components/Loading";
import Error from "../components/Error";
const Cabins = () => {
  const { isError, isLoading, data } = useGetCabins();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  console.log(data);
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">All Cabins</h2>
      <div className="cabin-table py-8  w-full ">
        <CabinTable data={data as CabinType[]} />
      </div>
      <AddCabin />
    </div>
  );
};

export default Cabins;
