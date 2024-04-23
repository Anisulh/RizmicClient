import { useRef, useEffect } from "react";
import loginImage from "../../assets/login_page.webp";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleResponse } from "../register/interface";
import { ILoginAPIParams } from "../../interface/userInterface";
import { useGoogleScript } from "../../api/googleAPI";
import { useAuth } from "../../contexts/UserContext";
import { loginAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema, LoginSchemaType } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { useToast } from "../../contexts/ToastContext";
import Button from "../../components/ui/Button";

function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/wardrobe");
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ userData, credential }: ILoginAPIParams) =>
      loginAPI({ userData, credential }),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        reset();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/wardrobe");
      }
    },
  });

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      mutate({ credential: res.credential });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
    }
  };
  const googleButton = useRef(null);
  useGoogleScript(handleGoogleSignIn, googleButton);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      mutate({ userData: data });
    } catch (error) {
      console.log(error);
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center min-h-screen overflow-auto">
      <div className="z-10 flex items-center justify-center min-h-screen h-max w-full lg:block">
        <div className="flex items-center justify-center h-screen md:h-fit md:rounded-3xl lg:min-h-screen lg:h-max lg:w-[42%] z-10 py-10 px-8 lg:p-0">
          <div>
            <h1 className="font-bold text-3xl lg:text-5xl tracking-wide">
              Welcome back!
            </h1>
            <p className="text-slategrey lg:text-lg">
              Login to find a fresh new fit or manage your wardrobe
            </p>
            <form
              className="lg:px-10 py-2 lg:py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input<LoginSchemaType>
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                register={register}
                error={errors.email}
                errorText={errors.email?.message}
              />

              <Input<LoginSchemaType>
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                register={register}
                error={errors.password}
                errorText={errors.password?.message}
              />

              <div className="flex justify-end -mt-2">
                <Link
                  to={"/forgot-password"}
                  className="text-sm text-ultramarineBlue hover:bg-inherit p-0"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="mt-6 w-full"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </form>
            <div className="flex items-center justify-center gap-1 py-4 ">
              <p>Already have an account?</p>
              <Link
                to="/register"
                className="font-medium text-ultramarineBlue p-1"
              >
                Register
              </Link>
            </div>
            <p className="text-center  my-4">Or, login with...</p>
            <div className="mt-6 w-fit mx-auto">
              <div ref={googleButton}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="hidden md:block object-cover w-full lg:w-[60%] h-screen absolute right-0 rounded-2xl"
        src={loginImage}
        alt="Room with clothes near window"
      />
    </div>
  );
}

export default Login;
