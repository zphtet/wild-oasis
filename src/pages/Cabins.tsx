import { getAllCabins } from "../supabase/apiCabins";
import { useQuery } from "@tanstack/react-query";
import CabinTable from "../components/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../components/CreateCabinForm";
import { CabinType } from "../types/types";

const Cabins = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => setShowForm((prev) => !prev);

  if (isLoading) return <p>Loading ....</p>;
  if (isError) return <p>Error ... </p>;
  console.log(data);
  return (
    <div>
      <h2 className="text-2xl font-bold">All Cabins</h2>
      <div className="cabin-table py-8">
        <CabinTable data={data as CabinType[]} />
      </div>
      <div className="btn-container flex justify-end">
        <button onClick={showFormHandler} className="btn">
          {showForm ? "Clear Form" : "Add Cabin"}
        </button>
      </div>
      {showForm && <CreateCabinForm />}
    </div>
  );
};

export default Cabins;
