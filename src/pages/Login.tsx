import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserType } from "../types/types";

const Login = () => {
  const { register, formState, handleSubmit } = useForm<Partial<NewUserType>>();

  const { name } = formState.errors;
  const submitHandler: SubmitHandler<Partial<NewUserType>> = (data) => {
    console.log(data);
  };
  return (
    <div className=" h-screen bg-slate-50 dark:bg-color-grey-0 grid place-items-center">
      <div className=" bg-white  w-[min(600px,100%)] px-10 py-5 flex flex-col items-center gap-4 ">
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

          <div className="flex items-center justify-end gap-5 pt-5">
            <button className="btn" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
