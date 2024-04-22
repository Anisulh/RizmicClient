import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import QuestionMarkCircleIcon from "@heroicons/react/20/solid/QuestionMarkCircleIcon";
import { resetPasswordAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../contexts/ToastContext";
import PasswordStrengthCheck from "../../components/PasswordStrengthCheck";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "./passwordResetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";

interface IResetPasswordAPIParams {
  passwordInfo: PasswordResetSchemaType;
  userId: string;
  resetToken: string;
}

function PasswordReset() {
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  let id = searchParams.get("id");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const [isShowing, setIsShowing] = useState(false);
  const password = watch("password");
  const { isLoading, mutate } = useMutation({
    mutationFn: ({
      passwordInfo,
      userId,
      resetToken,
    }: IResetPasswordAPIParams) =>
      resetPasswordAPI(passwordInfo, userId, resetToken),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        navigate("/login");
      }
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = async (data) => {
    try {
      if (id && token) {
        id = id.substring(0, id.length - 1);
        mutate({
          passwordInfo: data,
          userId: id,
          resetToken: token,
        });
        reset();
        navigate("/");
      } else {
        addToast({
          title: "Something went wrong.",
          description: "Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex content-container">
      <div className="m-auto justify-center">
        <h1 className="font-bold text-4xl">Password Reset</h1>
        <p className="text-gray-700">
          Enter the fields below to reset your password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mt-6 relative">
            <div className="w-full">
              <Input<PasswordResetSchemaType>
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                register={register}
                error={errors.password}
                errorText={errors.password?.message}
              />

              <PasswordStrengthCheck password={password} />
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
              <Input<PasswordResetSchemaType>
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                register={register}
                error={errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              />
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
