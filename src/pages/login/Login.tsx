import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import loginImage from "./images/login_page.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleResponse } from "../register/interface";

import { ILoginAPIParams, IUserLogin } from "../../interface/userInterface";
import { useGoogleScript } from "../../api/googleAPI";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";
import { IUserContext, UserContext } from "../../contexts/UserContext";
import { loginAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as IUserContext;
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

  const [userLoginData, setUserLoginData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const { email } = userLoginData;
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ userData, credential }: ILoginAPIParams) =>
      loginAPI({ userData, credential }),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      mutate({ credential: res.credential });
    } catch (error) {
      setError({ error });
    }
  };
  const googleButton = useRef(null);
  useGoogleScript(handleGoogleSignIn, googleButton);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setError({ message: "Email is not valid" });
      return;
    }
    try {
      mutate({ userData: userLoginData });
    } catch (error) {
      setError({ error });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  function handleForgotPasswordClick() {
    navigate("/forgotpassword");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-screen w-1/2 z-10 rounded-3xl">
        <div>
          <h1 className="font-bold text-4xl">Welcome back!</h1>
          <p className="text-slategrey ">
            Login to find a fresh new fit or manage your wardrobe
          </p>
          <form className="px-14" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
            />

            <div className="flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-1 py-2 px-3 placeholder-raisinblack"
              />
              <button
                type="button"
                className="absolute right-0 text-gray-600 hover:text-raisinblack px-2"
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6 bg-transparent" />
                ) : (
                  <EyeIcon className="h-6 w-6 bg-transparent" />
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleForgotPasswordClick}
                type="button"
                className="font-medium text-xs text-ultramarineBlue"
              >
                Forgot Password?
              </button>
            </div>

            <button
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
          <div className="flex items-center justify-center gap-1 py-4">
            <p>Already have an account?</p>
            <Link to="/register" className="font-medium text-ultramarineBlue">
              Register
            </Link>
          </div>
          <p className="text-center horizontalLines my-4">
            Or, login with...
          </p>
          <div className="mt-6 w-fit mx-auto">
            <div ref={googleButton}></div>
          </div>
        </div>
      </div>
      <div className="w-1/2"></div>
      <img
        className="object-cover w-4/6 h-screen absolute right-0"
        src={loginImage}
        alt="Room with clothes near window"
      />
    </div>
  );
}

export default Login;
