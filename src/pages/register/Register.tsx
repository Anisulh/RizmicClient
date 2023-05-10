import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";

import {
  registerFormValidation,
  usePasswordValidation,
} from "./registrationValidation";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleResponse } from "./interface";
import { IUserContext, UserContext } from "../../contexts/UserContext";

import { registerAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import {
  IRegisterAPIParams,
  IRegisterUser,
} from "../../interface/userInterface";
import { useGoogleScript } from "../../api/googleAPI";
import registerImage from "./images/registerImage.jpg";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";

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
  const { setUser } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [registerUserData, setRegisterUserData] = useState<IRegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const { password } = registerUserData;
  const passwordStrength = usePasswordValidation(password);

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ userData, credential }: IRegisterAPIParams) =>
      registerAPI({ userData, credential }),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
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
      setError({ error });
    }
  };
  const googleButton = useRef(null);
  useGoogleScript(handleGoogleSignIn, googleButton);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validated = registerFormValidation(
      registerUserData,
      setError,
      passwordStrength,
    );
    if (validated) {
      try {
        mutate({ userData: registerUserData });
      } catch (error) {
        setError({ error });
      }
    }
  };

  return (
    <div className="flex items-center justify-center content-container">
      <div className="z-10 flex items-center justify-center h-screen w-full lg:block">
        <div className="flex items-center justify-center lg:h-screen  lg:w-5/12 z-10 rounded-3xl bg-sWhite h-fit py-10 px-8 lg:p-0">
          <div>
            <h1 className="font-bold text-4xl">Register</h1>
            <p className="text-slategrey ">
              Fill in your details or continue with google with a simple click.
            </p>
            <form className="px-14" onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="border border-gray-100 rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack "
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="border border-gray-100 rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="border border-gray-100 rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
              />

              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="border border-gray-100 rounded-lg block w-full bg-ourGrey text-raisinblack my-1 py-2 px-3 placeholder-raisinblack"
                />
                <button
                  type="button"
                  className="absolute right-0 text-gray-600 hover:text-raisinblac2 px-3"
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
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
                            ? "red"
                            : passwordStrength === "medium"
                            ? "orange"
                            : "green",
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="border border-gray-100 rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
                />
                <button
                  type="button"
                  className="absolute right-0 text-gray-600 hover:text-raisinblack2 px-3"
                  onClick={() => {
                    setShowConfirmPassword((prevState) => !prevState);
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-6 w-6 bg-transparent" />
                  ) : (
                    <EyeIcon className="h-6 w-6  bg-transparent" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="mt-2 border border-gray-100 rounded-md text-raisinblack px-4 py-2 font-medium w-full bg-cambridgeblue"
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
            <div className="flex items-center justify-center gap-1 py-4 text-sm ">
              <p>Already have an account?</p>
              <Link to="/login" className="text-ultramarineBlue font-medium">
                Login
              </Link>
            </div>
            <p className="text-center horizontalLines my-4">
              Or, register with...
            </p>
            <div className="mt-6 w-fit mx-auto">
              <div ref={googleButton}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="object-cover w-full lg:w-8/12 h-screen absolute right-0"
        src={registerImage}
        alt="Clothing on a rack"
      />
    </div>
  );
}

export default Register;
