import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserType } from "../types/types";
import { useSignUpUser } from "../hooks/useUsers";
import toast from "react-hot-toast";
const CreateUser = () => {
  const { register, handleSubmit, getValues, reset } = useForm<NewUserType>();

  const { isPending, signUpUserEmail } = useSignUpUser();

  const submitHandler: SubmitHandler<NewUserType> = (data) => {
    // console.log(data);
    toast.error("Create user not allowed");
    return;
    signUpUserEmail(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Successfully created ! Checki your inbox to confirm");
          reset();
        },
        onError: () => {
          toast.error("Error creating new user  ");
        },
      }
    );
  };
  return (
    <div className=" w-[min(600px,100%)] px-10 py-5 bg-white dark:bg-color-grey-0">
      <form className="space-y-2  " onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Min 3 characters is required",
              },
            })}
            id="name"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            id="email"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password  is required",
              minLength: {
                value: 8,
                message: "Password muse be more than or equal 8 chars",
              },
            })}
            id="email"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) => value === getValues("password"),
            })}
            id="email"
            className="input"
          />
        </div>
        <div className="flex items-center justify-end gap-5 pt-5">
          <button type="reset" className="btn bg-white border text-slate-900">
            Cancel
          </button>
          <button
            className={`btn ${isPending && "opacity-80 cursor-not-allowed"}`}
            type="submit"
            disabled={isPending}
          >
            Create New User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
