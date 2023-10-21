import { useForm, SubmitHandler } from "react-hook-form";
import { CabinType } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCabin, useUpdateCabin } from "../hooks/useCabins";
import toast from "react-hot-toast";

type FormProps = {
  editData?: CabinType;
};
const CreateCabinForm = ({ editData }: FormProps) => {
  const { register, handleSubmit, reset } = useForm<CabinType>({
    defaultValues: editData,
  });
  const { isPending: isCreating, createCabin } = useCreateCabin();
  const { isPending: isUpdating, updateCabinById } = useUpdateCabin();
  const queryClient = useQueryClient();

  const isEditMode = editData;
  // handlers
  const submitHandler: SubmitHandler<CabinType> = (data) => {
    // console.log(data);
    if (isEditMode) {
      updateCabinById(
        { ...data },
        {
          onSuccess: () => {
            reset();
            toast.success(" Updated Successfully");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
          },
          onError(error) {
            toast.error(error.message);
          },
        }
      );
      return;
    }
    createCabin(
      {
        ...data,
      },
      {
        onSuccess: () => {
          reset();
          toast.success(" Created Successfully");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  const isLoading = isCreating || isUpdating;
  return (
    <div className=" p-5 px-10 w-[min(600px,95%)] mx-auto mt-5">
      <form className="space-y-2" onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label
            htmlFor="cabinName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cabin Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="cabinName"
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Maximum Capacity
          </label>
          <input
            type="number"
            {...register("maxCapacity")}
            id="capacity"
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Regular Price
          </label>
          <input
            type="number"
            {...register("regularPrice")}
            id="price"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="discount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Discount
          </label>
          <input
            type="number"
            {...register("discount")}
            id="discount"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("description")}
            className="textarea"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cabin Photo
          </label>
          <input
            type="file"
            {...register("image")}
            id="image"
            className="input"
          />
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className={`btn ${isLoading && "opacity-80"}`}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading ..."
              : isEditMode
              ? "Update This"
              : "Add This"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
