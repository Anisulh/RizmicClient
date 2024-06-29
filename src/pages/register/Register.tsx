import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleResponse } from "./interface";
import { useAuth } from "../../contexts/UserContext";
import { googleSignInAPI, registerAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useGoogleScript } from "../../api/googleAPI";
import registerImage from "../../assets/registerImage.webp";
import { useToast } from "../../contexts/ToastContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "./registerSchema";
import Input from "../../components/ui/inputs/Input";
import PasswordStrengthCheck from "../../components/PasswordStrengthCheck";
import Button from "../../components/ui/Button";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { setAuthCache } from "../../utils/indexDB";

declare global {
  const google: {
    accounts: {
      id: {
        initialize: (param: unknown) => void;
        renderButton: (param: unknown, param1: unknown) => void;
      };
    };
  };
}

function Register() {
  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/wardrobe");
    }
  });

  const registerMutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: async (data) => {
      reset();
      setUser(data.user);
      await setAuthCache(data.tokenExpiry);
      navigate("/wardrobe");
    },
    onError: (error) => {
      addToast({
        title: "Something went wrong.",
        description: error.message || "Unable to register. Please try again.",
        type: "error",
      });
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: googleSignInAPI,
    onSuccess: async (data) => {
      setUser(data.user);
      await setAuthCache(data.tokenExpiry);
      navigate("/wardrobe");
    },
    onError: (error) => {
      addToast({
        title: "Something went wrong.",
        description:
          error.message || "Unable to sign in via google. Please try again.",
        type: "error",
      });
    },
  });

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      await googleSignInMutation.mutateAsync(res.credential);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Unable to sign in via google. Please try again.",
        type: "error",
      });
    }
  };
  const googleButton = useRef(null);
  useGoogleScript(handleGoogleSignIn, googleButton);

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Unable to register. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="content-container mb-10 flex items-center justify-center">
      <div className="z-10 flex h-screen w-full items-center justify-center lg:block">
        <div className="z-10 flex h-screen items-center justify-center px-8 py-10 md:h-fit md:rounded-3xl lg:h-max lg:min-h-screen lg:w-[42%] lg:p-0">
          <div>
            <h1 className="text-3xl font-bold tracking-wide lg:text-4xl">
              Register
            </h1>
            <p className="text-slategrey lg:text-lg">
              Enter your details or continue with google.
            </p>
            <form
              className="h-full max-w-lg overflow-auto py-2 lg:px-10 lg:py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input<RegisterSchemaType>
                label="First Name"
                type="text"
                name="firstName"
                placeholder="First Name"
                control={control}
              />
              <Input<RegisterSchemaType>
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Last Name"
                control={control}
              />
              <Input<RegisterSchemaType>
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                control={control}
              />
              <Input<RegisterSchemaType>
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                control={control}
              />
              {password && <PasswordStrengthCheck password={password} />}
              <Input<RegisterSchemaType>
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                control={control}
              />
              <Input<RegisterSchemaType>
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                required={false}
                placeholder="Phone Number"
                control={control}
                formatInput={formatPhoneNumber}
              />{" "}
              <div className="mb-2 mt-4 flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  {...register("termsAndPolicy", { required: true })}
                  className="size-4 rounded-sm border-gray-300 text-raisinblack focus:border-raisinblack focus:ring-raisinblack dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
                <label
                  htmlFor="termsAndPolicy"
                  className="text-sm text-gray-700 md:text-base dark:text-white"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    className="p-1 text-ultramarineBlue"
                  >
                    Terms of Service
                    <ArrowTopRightOnSquareIcon className="ml-1 inline size-4" />
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="p-1 text-ultramarineBlue"
                  >
                    Privacy Policy
                    <ArrowTopRightOnSquareIcon className="ml-1 inline size-4" />
                  </Link>
                </label>
              </div>
              {errors.termsAndPolicy && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.termsAndPolicy.message}
                </p>
              )}
              <Button
                variant="secondary"
                type="submit"
                className="mt-6 w-full"
                isLoading={
                  registerMutation.isPending || googleSignInMutation.isPending
                }
              >
                Submit
              </Button>
            </form>
            <div className="flex items-center justify-center gap-1 py-4 text-base">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="p-1 font-medium text-ultramarineBlue"
              >
                Login
              </Link>
            </div>
            <p className="my-4 text-center text-base">Or, register with...</p>
            <div className="mx-auto mt-6 w-fit">
              <div ref={googleButton}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute right-0 top-0 hidden h-screen w-full rounded-2xl object-cover md:block lg:w-[60%]"
        src={registerImage}
        alt="Clothing on a rack"
      />
    </div>
  );
}

export default Register;
