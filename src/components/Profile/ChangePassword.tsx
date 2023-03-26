import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useMutation } from "@tanstack/react-query";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { changePasswordAPI } from "../../api/userAPI";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import { IUser } from "../../interface/userInterface";

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword({
  user,
  setError,
}: {
  user: IUser | null;
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
}) {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: IChangePasswordData;
      token: string;
    }) => {
      return changePasswordAPI(data, token);
    },
  });
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const { showCurrentPassword, showNewPassword, showConfirmPassword } =
    showPassword;
  const [changePasswordData, setChangePasswordData] =
    useState<IChangePasswordData>({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  const { currentPassword, newPassword, confirmPassword } = changePasswordData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangePasswordData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user && newPassword === confirmPassword) {
      mutate({ data: changePasswordData, token: user.token });
    } else {
      setError({
        message: "Ensure the New Password and Confirm Password are the same",
      });
    }
    setChangePasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="overflow-hidden ">
      <div className="flex justify-between items-center">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Settings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Change credentials
          </p>
        </div>
        <button
          className={`border h-8 px-4 rounded-md mt-2 ${
            changePassword
              ? "hover:bg-red-500 hover:text-white"
              : "hover:bg-ultramarineBlue hover:text-white"
          } transition-colors`}
          onClick={() => setChangePassword((prevState) => !prevState)}
        >
          {changePassword ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <PencilIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="border-t border-gray-200 ">
        <form onSubmit={handleSubmit} className="">
          <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <p className="text-sm font-medium text-gray-500">Change Password</p>
            <div className="flex flex-col w-full sm:col-span-2 mt-1 sm:mt-0 ">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-800"
              >
                Current Password:
              </label>
              <div className="flex flex-col w-full sm:col-span-2 relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className={`text-sm text-gray-900 border-gray-300 rounded-md py-1 px-2 ${
                    changePassword ? "bg-white" : "bg-gray-100"
                  }`}
                  id="currentPassword"
                  onChange={handleChange}
                  value={currentPassword}
                  disabled={!changePassword}
                />
                <button
                  type="button"
                  className="py-1 px-2 absolute right-0 text-gray-600"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      showCurrentPassword: !showCurrentPassword,
                    }))
                  }
                >
                  {showCurrentPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-800"
              >
                New Password:
              </label>
              <div className="flex flex-col w-full sm:col-span-2 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`text-sm text-gray-900 border-gray-300 rounded-md py-1 px-2 ${
                    changePassword ? "bg-white" : "bg-gray-100"
                  }`}
                  id="newPassword"
                  onChange={handleChange}
                  value={newPassword}
                  disabled={!changePassword}
                  required
                />
                <button
                  type="button"
                  className="py-1 px-2 absolute right-0 text-gray-600"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      showNewPassword: !showNewPassword,
                    }))
                  }
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-800"
              >
                Confirm Password:
              </label>
              <div className="flex flex-col w-full sm:col-span-2 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`text-sm text-gray-900 border-gray-300 rounded-md py-1 px-2 ${
                    changePassword ? "bg-white" : "bg-gray-100"
                  }`}
                  id="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword}
                  disabled={!changePassword}
                  required
                />
                <button
                  type="button"
                  className="py-1 px-2 absolute right-0 text-gray-600"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      showConfirmPassword: !showConfirmPassword,
                    }))
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {changePassword && (
            <div className="flex items-center justify-center mt-10">
              <button
                type="submit"
                className="text-sm rounded-md py-2 px-4 bg-ultramarineBlue text-white
                     "
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center bg-transparent">
                    <div
                      className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-transparent text-gray-300"
                      role="status"
                    >
                      <span className="sr-only">Loading</span>
                    </div>
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
