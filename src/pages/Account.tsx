import { SubmitHandler, useForm } from "react-hook-form";
import { NewUserType } from "../types/types";
import { useGetUser, useUpdateUser } from "../hooks/useUsers";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Account = () => {
  const { data } = useGetUser();
  const { isPending, updateUserAccount } = useUpdateUser();
  const { register, handleSubmit, getValues, formState } = useForm<
    Partial<NewUserType>
  >({
    defaultValues: {
      email: data?.email,
      name: data?.user_metadata?.name,
    },
  });
  const queryClient = useQueryClient();
  //   console.log(data);

  const submitHandler: SubmitHandler<Partial<NewUserType>> = (updateData) => {
    if (
      updateData.name === data?.user_metadata.name &&
      updateData.password === ""
    )
      return;

    if (updateData.password) {
      updateUserAccount(
        {
          password: updateData.password,
          name: updateData.name,
        },
        {
          onSuccess: (data) => {
            console.log("Updated data", data);
            toast.success("successfully updated");
            // queryClient.setQueryData("user" as unknown as QueryKey, data.user);
            queryClient.invalidateQueries({
              queryKey: ["user"],
            });
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
      return;
    }
    updateUserAccount(
      {
        name: updateData.name,
      },
      {
        onSuccess: (data) => {
          console.log("Updated data", data);
          toast.success("successfully updated");
          //   queryClient.setQueryData("user" as unknown as QueryKey, data.user);
          queryClient.invalidateQueries({
            queryKey: ["user"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  //   console.log(formState.errors);
  const { name, password, confirmPassword } = formState.errors;
  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Update your Account</p>
      <div className=" w-[min(600px,100%)] px-10 py-5 bg-white dark:bg-color-grey-0">
        <form className="space-y-2  " onSubmit={handleSubmit(submitHandler)}>
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
              className="input cursor-not-allowed opacity-50"
              disabled={true}
            />
          </div>

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
          {name?.message && (
            <p className="text-sm text-red-600">{name.message}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password muse be more than or equal 8 chars",
                },
              })}
              id="email"
              className="input"
            />
          </div>
          {password?.message && (
            <p className="text-sm text-red-600">{password.message}</p>
          )}

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
                validate: (value) =>
                  value === getValues("password") || "Password does not match",
              })}
              id="email"
              className="input"
            />
          </div>
          {confirmPassword?.message && (
            <p className="text-sm text-red-600">{confirmPassword.message}</p>
          )}
          <div className="flex items-center justify-end gap-5 pt-5">
            <button
              className={`btn ${isPending && "opacity-80 cursor-not-allowed"}`}
              type="submit"
              disabled={isPending}
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
