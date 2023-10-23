import { AiOutlineClose } from "react-icons/ai";
import CreateCabinForm from "./CreateCabinForm";
import useClickOutside from "../hooks/useClickOutside";
import { createPortal } from "react-dom";
import { CabinType } from "../types/types";

const Form = ({
  handler,
  editData,
}: {
  handler: () => void;
  editData?: CabinType;
}) => {
  const refOutside = useClickOutside(handler);
  return createPortal(
    <div className="bg-violet-600/30 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[2px] overflow-y-scroll">
      <div
        ref={refOutside}
        className="p-2 bg-white w-[min(600px,100%)] relative dark:bg-color-grey-0"
      >
        <button
          className="border absolute right-3 top-3 p-2 hover:border-violet-600"
          onClick={handler}
        >
          <AiOutlineClose className="text-2xl dark:text-white" />
        </button>
        <CreateCabinForm closeModel={handler} editData={editData} />
      </div>
    </div>,
    document.body
  );
};

export default Form;
