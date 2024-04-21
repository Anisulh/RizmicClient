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

  function handleForgotPasswordClick() {
    navigate("/forgot-password");
  }

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
                type="email"
                name="email"
                placeholder="Email"
                register={register}
                error={errors.email}
                errorText={errors.email?.message}
              />

              <Input<LoginSchemaType>
                type="password"
                name="password"
                placeholder="Password"
                register={register}
                error={errors.password}
                errorText={errors.password?.message}
              />

              <div className="flex justify-end">
                <button
                  onClick={handleForgotPasswordClick}
                  type="button"
                  className="font-medium text-sm lg:text-base text-ultramarineBlue"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-6 border border-gray-100 rounded-md text-raisinblack px-4 py-2 font-medium w-full lg:text-lg bg-cambridgeblue"
              >
                {isLoading ? (
                  <span className="flex justify-center items-center bg-transparent">
                    <div
                      className="spinner-border border-gray-100 animate-spin inline-block w-5 h-5 border border-gray-100-4 rounded-full bg-transparent text-gray-300"
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
            <div className="flex items-center text-base justify-center gap-1 py-4 ">
              <p>Already have an account?</p>
              <Link to="/register" className="font-medium text-ultramarineBlue">
                Register
              </Link>
            </div>
            <p className="text-center text-base my-4">Or, login with...</p>
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
