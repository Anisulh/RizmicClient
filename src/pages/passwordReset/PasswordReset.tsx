import { useNavigate, useSearchParams } from "react-router-dom";
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
import Input from "../../components/ui/inputs/Input";
import PopoverModal from "../../components/Popover/PopoverModal";

function PasswordReset() {
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { control, handleSubmit, reset, watch } =
    useForm<PasswordResetSchemaType>({
      resolver: zodResolver(PasswordResetSchema),
    });

  const password = watch("password");
  const { isPending, mutate } = useMutation({
    mutationFn: resetPasswordAPI,
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
      if (token) {
        mutate({ data, token });
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
    <div className="content-container flex">
      <div className="m-auto justify-center">
        <h1 className="text-4xl font-bold">Password Reset</h1>
        <p className="text-gray-700">
          Enter the fields below to reset your password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mt-6 flex items-center">
            <div className="w-full">
              <Input<PasswordResetSchemaType>
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                control={control}
              />

              <PasswordStrengthCheck password={password} />
            </div>
            <div className="absolute -right-6 -top-1 z-20">
              <PopoverModal
                anchor="right"
                button={
                  <QuestionMarkCircleIcon
                    className="ml-2 size-5 text-cambridgeblue transition duration-150 ease-in-out hover:text-opacity-100"
                    aria-hidden="true"
                  />
                }
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <div className="px-2">
                      <h6 className="py-2 text-sm font-medium text-gray-900">
                        Enter new password which meets the following conditions
                        for a strong password:
                      </h6>

                      <ul className="block list-none text-sm text-gray-500">
                        <li>Minimum of 6 characters</li>
                        <li>Contains one lowercase and one uppercase</li>
                        <li>A symbol</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </PopoverModal>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-full">
              <Input<PasswordResetSchemaType>
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                control={control}
              />
            </div>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="mt-6 w-full rounded-md border bg-cambridgeblue px-4 py-2 font-medium text-raisinblack"
          >
            {isPending ? (
              <span className="flex items-center justify-center bg-transparent">
                <div
                  className="spinner-border inline-block size-5 animate-spin rounded-full border-4 bg-transparent text-gray-300"
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
