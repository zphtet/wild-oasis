import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "../hooks/useClickOutside";
const AddCabin = () => {
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = () => setShowForm((prev) => !prev);
  const refOutside = useClickOutside(showFormHandler);
  return (
    <>
      <div className="btn-container self-stretch flex justify-start w-full ">
        <button onClick={showFormHandler} className="btn ">
          Add Cabin
        </button>
      </div>

      {showForm && (
        <div className="bg-violet-600/30 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[2px] overflow-y-scroll">
          <div
            ref={refOutside}
            className="p-2 bg-white w-[min(600px,100%)] relative"
          >
            <button
              className="border absolute right-3 top-3 p-2 hover:border-violet-600"
              onClick={showFormHandler}
            >
              <AiOutlineClose className="text-2xl" />
            </button>
            <CreateCabinForm />
          </div>
        </div>
      )}
    </>
  );
};

export default AddCabin;
