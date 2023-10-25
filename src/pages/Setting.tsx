import { ChangeEvent, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useGetSettings, useUpdateSettings } from "../hooks/useSettings";
import { SettingType } from "../types/types";
import toast from "react-hot-toast";

const Setting = () => {
  const { isError, isLoading, data } = useGetSettings();
  const { isPending, updateSetting } = useUpdateSettings();
  const [updateField, setUpdateField] = useState({});

  if (isError) return <Error />;
  if (isLoading) return <Loading />;
  const setting = data!.setting[0] as SettingType;

  const changeHandler = async (e: ChangeEvent) => {
    setUpdateField(() => ({}));
    const target = e.target as HTMLInputElement;
    const field = target.name;
    const value = +target.value;
    setUpdateField(() => ({
      [field]: value,
    }));
  };

  const blurHandler = async () => {
    if (Object?.keys(updateField).length === 0) return;

    updateSetting(updateField, {
      onSuccess: () => {
        toast.success("Successfully updated");
      },
      onError: () => {
        toast.error("Error updating setting");
      },
    });
    setUpdateField(() => ({}));
  };
  return (
    <div>
      <p className="text-2xl">Update Hotel Settings</p>
      <div className="mt-5 w-[min(600px,100%)] border mr-auto p-10 bg-white rounded-md dark:bg-color-grey-0">
        <form className="space-y-3">
          <div>
            <label
              htmlFor="min-night-book"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Minimun nights/booking
            </label>
            <input
              type="number"
              id="min-night-book"
              className={`input ${
                isPending && "opacity-80 cursor-not-allowed"
              }`}
              disabled={isPending}
              name="minBookLength"
              defaultValue={setting.minBookLength}
              onChange={changeHandler}
              onBlur={blurHandler}
              min={1}
              required
            />
          </div>

          <div>
            <label
              htmlFor="max-night-book"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Maximun nights/booking
            </label>
            <input
              type="number"
              id="max-night-book"
              className={`input ${
                isPending && "opacity-80 cursor-not-allowed"
              }`}
              disabled={isPending}
              name="maxBookLength"
              min={1}
              required
              defaultValue={setting.maxBookLength}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
          </div>

          <div>
            <label
              htmlFor="max-guests-book"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Maximun guests/booking
            </label>
            <input
              type="number"
              id="max-guests-book"
              className={`input ${
                isPending && "opacity-80 cursor-not-allowed"
              }`}
              disabled={isPending}
              name="maxGuestPerCabin"
              defaultValue={setting.maxGuestPerCabin}
              onChange={changeHandler}
              onBlur={blurHandler}
              min={1}
              required
            />
          </div>

          <div>
            <label
              htmlFor="breakfast-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Breakfast price
            </label>
            <input
              type="number"
              id="breakfast-price"
              className={`input ${
                isPending && "opacity-80 cursor-not-allowed"
              }`}
              disabled={isPending}
              name="breakfastPrice"
              defaultValue={setting.breakfastPrice}
              onChange={changeHandler}
              onBlur={blurHandler}
              min={1}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
