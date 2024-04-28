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
const formatPhoneNumber = (input: string): string => {
  // Strip all non-digits
  const digits = input.replace(/\D/g, "");
  // Capture groups of digits to format
  const match = digits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
  if (!match) {
    return "";
  }

  const [, areaCode, middleThree, lastFour] = match;

  // Format and combine parts of the phone number
  let result = "";
  if (areaCode) result = `(${areaCode}`;
  if (middleThree) result += `) ${middleThree}`;
  if (lastFour) result += `-${lastFour}`;

  return result;
};
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
  const { control, handleSubmit, reset, watch } = useForm<RegisterSchemaType>({
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
        console.log(data);
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
        console.log(data);
        setUser(data);
        navigate("/wardrobe");
      }
    },
  });

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      await googleSignInMutation.mutateAsync(res.credential);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      addToast({
        title: "Something went wrong.",
        description: "An error occurred.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center overflow-auto min-h-screen">
      <div className="z-10 flex items-center justify-center h-screen w-full lg:block">
        <div className="flex items-center justify-center h-screen md:h-fit md:rounded-3xl lg:min-h-screen lg:h-max lg:w-[42%] z-10 py-10 px-8 lg:p-0">
          <div>
            <h1 className="font-bold text-3xl lg:text-5xl tracking-wide">
              Register
            </h1>
            <p className="text-slategrey lg:text-lg">
              Fill in your details or continue with google with a simple click.
            </p>
            <form
              className="lg:px-10 py-2 lg:py-5 max-w-lg"
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
              />
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
              <Link to="/login" className="text-ultramarineBlue font-medium">
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
        className="hidden md:block object-cover w-full lg:w-[60%] h-screen absolute right-0 rounded-2xl"
        src={registerImage}
        alt="Clothing on a rack"
      />
    </div>
  );
}

export default Register;
