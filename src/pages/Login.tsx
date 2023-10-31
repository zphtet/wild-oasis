import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserType } from "../types/types";
import { useLoginUser, useGetUser } from "../hooks/useUsers";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const Login = () => {
  const { register, handleSubmit } = useForm<Partial<NewUserType>>();
  const { isPending, LoginByEmailPassword } = useLoginUser();
  const { isAuthenticated, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //   console.log(data, isAuthenticated, isError, isLoading);
  const submitHandler: SubmitHandler<Partial<NewUserType>> = async (data) => {
    LoginByEmailPassword(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          toast.success("Login successful");
          console.log(data);
          queryClient.setQueryData(
            "user" as unknown as QueryKey,
            () => data.user
          );
          navigate("/");
        },
        onError: (err) => {
          console.log(err);
          toast.error(err.message);
        },
      }
    );
  };
  if (isLoading) return <Loading />;
  if (isAuthenticated) {
    navigate(-1);
    return <Loading />;
  }
  return (
    <>
      <Toaster />
      <div className=" h-screen bg-slate-50 dark:bg-color-grey-0 grid place-items-center">
        <div className=" bg-white dark:bg-color-grey-50  w-[min(520px,100%)] px-10 py-5 flex flex-col items-center gap-4 ">
          <div className="max-w-[150px]">
            <img
              src="/logo-light.png"
              className="w-full object-cover "
              alt="Logo light"
            />
          </div>
          <form
            className="space-y-2  w-full"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div>
              <label
                htmlFor="email-login"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Address
              </label>
              <input
                type="email-login"
                {...register("email", {
                  required: "Email is required",
                })}
                id="email"
                className="input"
              />
            </div>

            <div>
              <label
                htmlFor="password-login"
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
                id="password-login"
                className="input"
              />
            </div>

            <div className="flex items-center justify-end gap-5 pt-5">
              <button
                className={`btn ${isPending && "opacity-80"}`}
                disabled={isPending}
                type="submit"
              >
                {isPending ? <LoadingSpinner /> : " Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
