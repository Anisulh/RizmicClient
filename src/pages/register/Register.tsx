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
import Status from "../../components/Status";
import {
  registerFormValidation,
  usePasswordValidation,
} from "./registrationValidation";
import { useNavigate } from "react-router-dom";
import { IGoogleResponse, IStatusState } from "./interface";
import { IUserContext, UserContext } from "../../UserContext";

import { registerAPI } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import {
  IRegisterAPIParams,
  IRegisterUser,
} from "../../interface/userInterface";
import { loadGoogleScript } from "../../api/googleAPI";

declare global {
  const google: any;
}

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as IUserContext;
  const [registerUserData, setRegisterUserData] = useState<IRegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<IStatusState>({
    isError: false,
    message: "",
    showStatus: false,
  });
  const passwordStrength = usePasswordValidation(registerUserData.password);
  const { isError, message, showStatus } = status;
  const { password } = registerUserData;

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ userData, credential }: IRegisterAPIParams) =>
      registerAPI({ userData, credential }),
    onSuccess(data) {
      if (data.message) {
        setStatus({
          isError: true,
          message: data.message,
          showStatus: true,
        });
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    },
  });
  const googleButton = useRef(null);
  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    try {
      mutate({ credential: res.credential });
    } catch (error) {
      setStatus({
        isError: true,
        message: "Something went wrong when registering with google",
        showStatus: true,
      });
    }
  };
  loadGoogleScript(handleGoogleSignIn, googleButton);
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
      setStatus,
      passwordStrength
    );
    if (validated) {
      try {
        mutate({ userData: registerUserData });
      } catch (error) {
        setStatus({
          isError: true,
          message: `Unable to register user ${error}`,
          showStatus: true,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center page-height">
      {showStatus && (
        <Status message={message} isError={isError} setStatus={setStatus} />
      )}
      <div>
        <h1 className="font-bold text-3xl">Register</h1>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            className="border rounded block w-full"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            className="border rounded block w-full"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="border rounded block w-full"
          />
          <label>Password</label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="border rounded block w-full"
            />
            <button
              type="button"
              className="absolute right-0 text-gray-600"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
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

          <label>Confirm Password</label>
          <div className="flex items-center relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              className="border rounded block w-full"
            />
            <button
              type="button"
              className="absolute right-0"
              onClick={() => {
                setShowConfirmPassword((prevState) => !prevState);
              }}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <EyeIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="mt-2 border rounded-md bg-red-900 text-white px-4 py-2 font-medium w-full"
          >
            {isLoading ? (
              <span className="flex justify-center items-center bg-red-900">
                <div
                  className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-red-900 text-gray-300"
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
        <div className="flex justify-center">
          <div ref={googleButton}></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
