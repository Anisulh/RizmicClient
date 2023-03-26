import { useContext, useEffect, ChangeEvent, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import QuestionMarkCircleIcon from "@heroicons/react/20/solid/QuestionMarkCircleIcon";
import {
  IPasswordData,
  passwordResetFormValidation,
  usePasswordValidation,
} from "./PasswordResetFormValidation";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";
import { resetPasswordAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";

function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setshowConfirmedPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShowing, setIsShowing] = useState(false);
  const { password } = passwordData;
  const passwordStrength = usePasswordValidation(password);
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  const { isLoading, mutate } = useMutation({
    mutationFn: (passwordInfo: IPasswordData) => resetPasswordAPI(passwordInfo),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        navigate("/login");
      }
    },
  });

  //   const passwordRequirements = [
  //     "Minimum of 6 characters",
  //     "Contains one lowercase and one uppercase",
  //     "A symbol",
  //   ];

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validated = passwordResetFormValidation(
      passwordData,
      setError,
      passwordStrength,
    );
    if (validated) {
      try {
        mutate(passwordData);
        navigate("/");
      } catch (error) {
        setError({ error });
      }
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };
  const handleClickShowConfirmedPassword = () => {
    setshowConfirmedPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto justify-center">
        <h1 className="font-bold text-4xl">Password Reset</h1>
        <p className="text-gray-700">
          Enter the fields below to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mt-6 relative">
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg text-sm block w-full  text-raisinblack py-2 px-3 placeholder-gray-600"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-0 text-gray-600 hover:text-raisinblack px-2"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6 bg-transparent" />
                  ) : (
                    <EyeIcon className="h-6 w-6 bg-transparent" />
                  )}
                </button>
              </div>
              {password && (
                <div>
                  <p>
                    {passwordStrength.charAt(0).toUpperCase() +
                      passwordStrength.slice(1)}{" "}
                    Password
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                    <div
                      className=" h-2.5 rounded-full"
                      style={{
                        width:
                          passwordStrength === "weak"
                            ? "35%"
                            : passwordStrength === "medium"
                            ? "70%"
                            : "100%",
                        backgroundColor:
                          passwordStrength === "weak"
                            ? "#8b0000"
                            : passwordStrength === "medium"
                            ? "orange"
                            : "green",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute -top-1 -right-6 z-20">
              <Popover className="relative">
                <Popover.Button className="text-opacity-90 hover:text-opacity-100 focus:outline-none rounded-full p-0 bg-transpare">
                  <QuestionMarkCircleIcon
                    onMouseEnter={() => setIsShowing(true)}
                    onMouseLeave={() => setIsShowing(false)}
                    className="ml-2 h-5 w-5 text-cambridgeblue transition duration-150 ease-in-out hover:text-opacity-100"
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                  show={isShowing}
                >
                  <Popover.Panel className="absolute left-full  z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="p-4">
                        <div className=" px-2  ">
                          <h6 className="text-sm font-medium text-gray-900 py-2">
                            Enter new password which meets the following
                            conditions for a strong password:
                          </h6>

                          <ul className="list-none block text-sm text-gray-500 ">
                            <li>Minimum of 6 characters</li>
                            <li>Contains one lowercase and one uppercase</li>
                            <li>A symbol</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg text-sm block w-full  text-raisinblack py-2 px-3 placeholder-gray-600"
                  type={showConfirmedPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm the new password"
                  required
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="absolute top-2.5 right-0 text-gray-600 hover:text-raisinblack px-2"
                  onClick={handleClickShowConfirmedPassword}
                >
                  {showConfirmedPassword ? (
                    <EyeSlashIcon className="h-6 w-6 bg-transparent" />
                  ) : (
                    <EyeIcon className="h-6 w-6 bg-transparent" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-6 border rounded-md text-raisinblack px-4 py-2 font-medium w-full bg-cambridgeblue"
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
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
