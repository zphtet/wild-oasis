import { confirmable } from "react-confirm";
import { createConfirmation } from "react-confirm";
type DeleteProps = {
  proceed?: (state: boolean) => void;
  show?: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
const DeleteConfirm = ({ proceed, show }: DeleteProps) => {
  if (!show) return;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-violet-600/30 backdrop-blur-[2px] z-50">
      <div className="w-[min(375px,100%)] p-5 bg-white space-y-6 dark:bg-color-grey-50 dark:text-white ">
        <p className="text-sm">Are you sure you want to delte this item</p>
        <div className="flex gap-5 justify-end">
          <button
            className=" btn bg-white border py-1 rounded border-violet-600 text-slate-800"
            onClick={() => proceed?.(false)}
          >
            Cancel
          </button>
          <button className="btn py-1 rounded" onClick={() => proceed?.(true)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default createConfirmation(confirmable(DeleteConfirm));
