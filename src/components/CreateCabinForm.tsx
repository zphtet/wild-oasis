import { useForm, SubmitHandler } from "react-hook-form";
import { CabinType } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCabin, useUpdateCabin } from "../hooks/useCabins";
import toast from "react-hot-toast";

type FormProps = {
  editData?: CabinType;
  closeModel?: () => void;
};
const CreateCabinForm = ({ editData, closeModel }: FormProps) => {
  const { register, handleSubmit, reset, formState, getValues } =
    useForm<CabinType>({
      defaultValues: editData,
    });
  const { isPending: isCreating, createCabin } = useCreateCabin();
  const { isPending: isUpdating, updateCabinById } = useUpdateCabin();
  const queryClient = useQueryClient();

  const { name, image, regularPrice, discount, maxCapacity } = formState.errors;

  const isEditMode = editData;
  // handlers
  const submitHandler: SubmitHandler<CabinType> = (data) => {
    if (isEditMode) {
      updateCabinById(
        { ...data, discount: data.discount ? data.discount : 0 },
        {
          onSuccess: () => {
            reset();
            toast.success(" Updated Successfully");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            closeModel?.();
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
          closeModel?.();
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  const isLoading = isCreating || isUpdating;
  return (
    <div className=" p-5 px-10  mx-auto mt-5">
      <form className="space-y-2  " onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label
            htmlFor="cabinName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cabin Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Cabin name is required",
              minLength: {
                value: 3,
                message: "Min 3 characters is required",
              },
            })}
            id="cabinName"
            className="input"
          />
          {name?.message && (
            <p className="text-sm text-red-600">{name.message}</p>
          )}
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
            {...register("maxCapacity", {
              required: "Maximun capacity is required",
              min: {
                value: 1,
                message: "value must bet qual or greater than 1",
              },
              max: {
                value: 10,
                message: "value must not greater than 10",
              },
            })}
            id="capacity"
            className="input"
          />
          {maxCapacity?.message && (
            <p className="text-sm text-red-600">{maxCapacity.message}</p>
          )}
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
            {...register("regularPrice", {
              required: "price is required",
              min: {
                value: 0,
                message: "value must be positive number",
              },
            })}
            id="price"
            min={1}
            className="input"
          />
          {regularPrice?.message && (
            <p className="text-sm text-red-600">{regularPrice.message}</p>
          )}
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
            {...register("discount", {
              validate: (value) => {
                return (
                  Number(value) <= getValues("regularPrice") ||
                  "Discount must not be greater than normal price"
                );
              },
            })}
            id="discount"
            className="input"
          />
          {discount?.message && (
            <p className="text-sm text-red-600">{discount.message}</p>
          )}
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
            rows={3}
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
            {...register("image", {
              required: isEditMode ? false : "Cabin photo is required",
            })}
            id="image"
            className="input"
          />
          {image?.message && (
            <p className="text-sm text-red-600">{image.message}</p>
          )}
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
              ? "Update Cabin"
              : "Add Cabin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
