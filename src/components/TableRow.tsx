import { CabinType } from "../types/types";
import { useDeleteCabin, useCreateCabin } from "../hooks/useCabins";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import Form from "./Form";
import ConfirmDelete from "./ConfirmDelete";

type RowType = {
  rowData: CabinType;
};

const TableRow = ({ rowData }: RowType) => {
  const { id, image, maxCapacity, name, regularPrice, discount } = rowData;
  const { deleteCabinById } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const queryClient = useQueryClient();
  const [showEditForm, setShowEditForm] = useState(false);
  const [actionActive, setActionActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const focusHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    setActionActive((prev) => !prev);
    if (actionActive) {
      target.focus();
    }
  };

  const deleteHandler = async () => {
    setIsDeleting((prev) => !prev);
    deleteCabinById(id as number, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        setActionActive(false);
      },
      onError: () => {
        toast.error("Error deleting");
      },
      onSettled: () => {
        setShowModal(false);
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
        setActionActive(false);
      },
      onError: () => {
        toast.error("Duplication Error");
      },
    });
  };

  const editHandler = () => {
    setShowEditForm((prev) => !prev);
  };

  // const isLoading = isDeleting || isCreating;
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th
          scope="row"
          className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3 "
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
        <td className=" px-1 py-4">Fill up to {maxCapacity} guests</td>
        <td className=" px-1 py-4">${regularPrice}</td>
        <td className="px-1 py-4">{`${
          discount > 0 ? "$" + discount : "--"
        }`}</td>
        <td className="px-1 py-4   table-cell h-full text-right ">
          <button
            onClick={focusHandler}
            className="cursor-pointer w-min p-2 relative bg-slate-100 focus:outline-1 focus:outline-violet-600 focus:bg-slate-200 focus:border focus:border-violet-600 rounded dark:bg-color-grey-0"
          >
            <BiDotsVerticalRounded className=" text-xl" />

            {actionActive && (
              <div className="absolute right-[100%] -bottom-[200%]  bg-slate-100  rounded space-y-1 p-1 dark:bg-color-grey-0">
                <div
                  onClick={duplicateHandler}
                  className="action-btn"
                  // onBlur={() => setActionActive(false)}
                >
                  {" "}
                  <HiOutlineDuplicate /> duplicate
                </div>
                <div onClick={editHandler} className="action-btn">
                  {" "}
                  <BiEdit /> edit
                </div>
                <div onClick={() => setShowModal(true)} className="action-btn">
                  {" "}
                  <RiDeleteBinLine /> delete
                </div>
              </div>
            )}
          </button>
        </td>
      </tr>
      {showEditForm && (
        <Form
          handler={() => setShowEditForm((prev) => !prev)}
          editData={rowData}
        />
      )}
      {showModal && (
        <ConfirmDelete
          closeModal={setShowModal}
          isLoading={isDeleting}
          handler={deleteHandler}
        />
      )}
    </>
  );
};

export default TableRow;
