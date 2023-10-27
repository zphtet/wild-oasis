import LoadingSpinner from "./LoadingSpinner";
type DeleteProps = {
  closeModal: (state: boolean) => void;
  isLoading: boolean;
  handler: () => void;
};

const ConfirmDelete = ({ closeModal, isLoading, handler }: DeleteProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-violet-600/30 backdrop-blur-[2px] z-50">
      <div className="w-[min(375px,100%)] p-5 bg-white space-y-6 dark:bg-color-grey-50 dark:text-white ">
        <p className="text-sm">
          Are you sure you want to delte this item. This action can't be undone
        </p>
        <div className="flex gap-5 justify-end">
          <button
            className={`btn bg-white border py-1 rounded border-violet-600 text-slate-800 ${
              isLoading && "cursor-not-allowed"
            }`}
            onClick={() => closeModal(false)}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn py-1 rounded"
            disabled={isLoading}
            onClick={handler}
          >
            {isLoading && <LoadingSpinner />}
            {!isLoading && "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
