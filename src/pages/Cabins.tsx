import { useEffect } from "react";
import { getAllCabins } from "../supabase/apiCabins";
const Cabins = () => {
  useEffect(() => {
    getAllCabins().then((data) => console.log(data));
  }, []);
  return <div>Cabins</div>;
};

export default Cabins;
