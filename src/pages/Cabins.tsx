import CabinTable from "../components/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../components/CreateCabinForm";
import { CabinType } from "../types/types";
import { useGetCabins } from "../hooks/useCabins";
const Cabins = () => {
  const { isError, isLoading, data } = useGetCabins();
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = () => setShowForm((prev) => !prev);
  if (isLoading) return <p>Loading ....</p>;
  if (isError) return <p>Error ... </p>;
  console.log(data);
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">All Cabins</h2>
      <div className="cabin-table py-8  w-full ">
        <CabinTable data={data as CabinType[]} />
      </div>
      <div className="btn-container self-stretch flex justify-start w-full ">
        <button onClick={showFormHandler} className="btn ">
          {showForm ? "Clear Form" : "Add Cabin"}
        </button>
      </div>
      {showForm && <CreateCabinForm />}
    </div>
  );
};

export default Cabins;
