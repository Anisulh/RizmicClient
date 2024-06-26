import { useRef, useEffect } from "react";
import loginImage from "../../assets/login_page.webp";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleResponse } from "../register/interface";
import { useGoogleScript } from "../../api/googleAPI";
import { useAuth } from "../../contexts/UserContext";
import { googleSignInAPI, loginAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema, LoginSchemaType } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/inputs/Input";
import { useToast } from "../../contexts/ToastContext";
import Button from "../../components/ui/Button";
import { setAuthCache, setUserCache } from "../../utils/indexDB";

function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/wardrobe");
    }
  });

  const { control, handleSubmit, reset } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: async (data) => {
      reset();
      setUser(data.user);
      await setAuthCache(data.tokenExpiry);
      await setUserCache(data.user);

      navigate("/wardrobe");
    },
    onError: (error) => {
      addToast({
        title: "Something went wrong.",
        description: error.message || "Unable to log in. Please try again.",
        type: "error",
      });
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: googleSignInAPI,
    onSuccess: async (data) => {
      setUser(data.user);
      await setAuthCache(data.tokenExpiry);
      await setUserCache(data.user);
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
      const { credential } = res;
      await googleSignInMutation.mutateAsync(credential);
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

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Unable to log in. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center overflow-auto">
      <div className="z-10 flex h-max min-h-screen w-full items-center justify-center lg:block">
        <div className="z-10 flex h-screen items-center justify-center px-8 py-10 md:h-fit md:rounded-3xl lg:h-max lg:min-h-screen lg:w-[42%] lg:p-0">
          <div>
            <h1 className="text-3xl font-bold tracking-wide lg:text-4xl">
              Welcome back!
            </h1>
            <p className="text-slategrey lg:text-lg">
              Login to find a fresh new fit or manage your wardrobe
            </p>
            <form
              className="py-2 lg:px-10 lg:py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input<LoginSchemaType>
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                control={control}
              />

              <Input<LoginSchemaType>
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                control={control}
              />

              <div className="-mt-2 flex justify-end">
                <Link
                  to={"/forgot-password"}
                  className="p-0 text-sm text-ultramarineBlue hover:bg-inherit"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="mt-6 w-full"
                isLoading={
                  loginMutation.isPending || googleSignInMutation.isPending
                }
              >
                Submit
              </Button>
            </form>
            <div className="flex items-center justify-center gap-1 py-4">
              <p>Already have an account?</p>
              <Link
                to="/register"
                className="p-1 font-medium text-ultramarineBlue"
              >
                Register
              </Link>
            </div>
            <p className="my-4 text-center">Or, login with...</p>
            <div className="mx-auto mt-6 w-fit">
              <div ref={googleButton}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute right-0 hidden h-screen w-full rounded-2xl object-cover md:block lg:w-[60%]"
        src={loginImage}
        alt="Room with clothes near window"
      />
    </div>
  );
}

export default Login;
