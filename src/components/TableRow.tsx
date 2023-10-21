import { CabinType } from "../types/types";
import { useDeleteCabin, useCreateCabin } from "../hooks/useCabins";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
type RowType = {
  rowData: CabinType;
};

const TableRow = ({ rowData }: RowType) => {
  const { id, image, maxCapacity, name, regularPrice, discount } = rowData;
  const { isPending: isDeleting, deleteCabinById } = useDeleteCabin();
  const { createCabin, isPending: isCreating } = useCreateCabin();
  const queryClient = useQueryClient();
  const [showEditForm, setShowEditForm] = useState(false);

  const deleteHandler = () => {
    deleteCabinById(id as number, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: () => {
        toast.error("Error deleting");
      },
    });
  };

  const duplicateHandler = () => {
    const duplicateData = { ...rowData, name: `copy of ${rowData.name}` };
    delete duplicateData.id;
    createCabin(duplicateData, {
      onSuccess: () => {
        toast.success("Duplicated Successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: () => {
        toast.error("Duplication Error");
      },
    });
  };

  const editHandler = () => {
    setShowEditForm((prev) => !prev);
  };

  const isLoading = isDeleting || isCreating;
  return (
    <>
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
        <td className="px-6 py-4 space-x-2">
          <button
            onClick={deleteHandler}
            className="bg-red-600 text-white text-sm"
            disabled={isLoading}
          >
            de
          </button>
          <button
            onClick={duplicateHandler}
            className="bg-violet-600 text-white text-sm"
            disabled={isLoading}
          >
            du
          </button>

          <button
            onClick={editHandler}
            className="bg-green-600 text-white text-sm"
            disabled={isLoading}
          >
            ed
          </button>
        </td>
      </tr>
      {showEditForm && (
        <div className="w-full table-cell horizontal-middle border border-red-600">
          <CreateCabinForm editData={rowData} />
        </div>
      )}
    </>
  );
};

export default TableRow;
