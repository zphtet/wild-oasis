import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputs } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCabin } from "../hooks/useCabins";
import toast from "react-hot-toast";
const CreateCabinForm = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const { isPending, createCabin } = useCreateCabin();
  const queryClient = useQueryClient();
  // handlers
  const submitHandler: SubmitHandler<FormInputs> = (data) => {
    createCabin(
      {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount),
        capacity: Number(data.capacity),
      },
      {
        onSuccess: () => {
          reset();
          toast.success(" Created Successfully");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError() {
          toast.error("Error creating new cabin");
        },
      }
    );
  };
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
            {...register("capacity")}
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
            {...register("price")}
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
            {...register("message")}
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
            className={`btn ${isPending && "opacity-80"}`}
            disabled={isPending}
          >
            {isPending ? "Loading ..." : "Add This"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
