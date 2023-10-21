import { CabinType } from "../types/types";
import { useDeleteCabin } from "../hooks/useCabins";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
type RowType = {
  rowData: CabinType;
};

const TableRow = ({ rowData }: RowType) => {
  const { id, image, maxCapacity, name, regularPrice, discount } = rowData;
  const { isPending, deleteCabinById } = useDeleteCabin();
  const queryClient = useQueryClient();

  const deleteHandler = () => {
    deleteCabinById(id, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: () => {
        toast.error("Error deleting");
      },
    });
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3 "
      >
        <div className="img-container w-[70px] h-[50px] overflow-hidden">
          <img
            src={image}
            alt={image || "cabin image"}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>

        <p>{name}</p>
      </th>
      <td className="px-6 py-4">Fill up to {maxCapacity} guests</td>
      <td className="px-6 py-4">${regularPrice}</td>
      <td className="px-6 py-4">{`${discount ? "$" + discount : "--"}`}</td>
      <td className="px-6 py-4">
        <button
          onClick={deleteHandler}
          className="bg-red-600 text-white text-sm"
          disabled={isPending}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
