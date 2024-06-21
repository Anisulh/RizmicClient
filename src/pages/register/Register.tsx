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
    onSuccess: (data) => {
      if (data.message) {
        addToast({
          title: "Error",
          description: data.message,
          type: "error",
        });
      } else {
        reset();
        setUser(data);
        navigate("/wardrobe");
      }
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: googleSignInAPI,
    onSuccess: (data) => {
      if (data.message) {
        addToast({
          title: "Error",
          description: data.message,
          type: "error",
        });
      } else {
        setUser(data);
        navigate("/wardrobe");
      }
    },
  });

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      await googleSignInMutation.mutateAsync(res.credential);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "An error occurred.",
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
    <div className="flex items-center justify-center content-container mb-10">
      <div className="z-10 flex items-center justify-center h-screen w-full lg:block">
        <div className="flex items-center justify-center h-screen md:h-fit md:rounded-3xl lg:min-h-screen lg:h-max lg:w-[42%] z-10 py-10 px-8 lg:p-0">
          <div>
            <h1 className="font-bold text-4xl lg:text-6xl tracking-wide">
              Register
            </h1>
            <p className="text-slategrey lg:text-lg">
              Fill in your details or continue with google with a simple click.
            </p>
            <form
              className="lg:px-10 py-2 lg:py-5 max-w-lg h-full overflow-auto "
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
              <div className="flex items-center justify-center gap-2  mt-4 mb-2">
                <input
                  type="checkbox"
                  {...register("termsAndPolicy", { required: true })}
                  className="h-4 w-4 text-raisinblack border-gray-300 rounded-sm focus:ring-raisinblack focus:border-raisinblack dark:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                />
                <label
                  htmlFor="termsAndPolicy"
                  className="text-sm md:text-base text-gray-700 dark:text-white"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    className="text-ultramarineBlue p-1 "
                  >
                    Terms of Service
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline ml-1" />
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="text-ultramarineBlue p-1"
                  >
                    Privacy Policy
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline ml-1" />
                  </Link>
                </label>
              </div>
              {errors.termsAndPolicy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.termsAndPolicy.message}
                </p>
              )}
              <Button
                variant="secondary"
                type="submit"
                className="mt-6 w-full"
                isLoading={registerMutation.isPending}
              >
                Submit
              </Button>
            </form>
            <div className="flex text-base items-center justify-center gap-1 py-4 ">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="text-ultramarineBlue font-medium p-1"
              >
                Login
              </Link>
            </div>
            <p className="text-center text-base my-4">Or, register with...</p>
            <div className="mt-6 w-fit mx-auto">
              <div ref={googleButton}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="hidden md:block object-cover w-full lg:w-[60%] h-screen absolute top-0 right-0 rounded-2xl"
        src={registerImage}
        alt="Clothing on a rack"
      />
    </div>
  );
}

export default Register;
