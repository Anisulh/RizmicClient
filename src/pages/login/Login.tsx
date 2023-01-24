import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import loginImage from "./images/login_page.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IStatusState } from "../register/interface";
import { IGoogleResponse } from "../register/interface";
import { IUserLogin } from "../../interface/userInterface";
import { loadGoogleScript } from "../../api/googleAPI";

function Login() {
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { email } = userLoginData;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<IStatusState>({
    isError: false,
    message: "",
    showStatus: false,
  });
  const googleButton = useRef(null);

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    console.log(res.credential);
    const response = await fetch("http://localhost:7000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.credential}`,
      },
    });
    if (response.ok) {
      navigate("/");
    } else {
      setStatus({
        isError: true,
        message: "Something went wrong when logging in with google",
        showStatus: true,
      });
    }
  };
  loadGoogleScript(handleGoogleSignIn, googleButton);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setLoading(false);
      setStatus({
        isError: true,
        message: "Invalid Email, please try again",
        showStatus: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      });
      if (response.ok) {
        setLoading(false);
        setStatus({ isError: false, message: "", showStatus: false });
        navigate("/");
      } else {
        setLoading(false);
        setStatus({
          isError: true,
          message: "Unable to login user",
          showStatus: true,
        });
      }
    } catch (error) {
      setLoading(false);
      setStatus({
        isError: true,
        message: "Unable to login user",
        showStatus: true,
      });
    }

    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-screen w-1/2 ">
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
              className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-1 px-2"
            />

            <div className="flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-1 py-1 px-2"
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

            <button
              type="submit"
              className="mt-6 border rounded-md text-raisinblack px-4 py-2 font-medium w-full bg-cambridgeblue"
            >
              {loading ? (
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
            <Link to="/register" className="underline font-medium">
              Register
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

      <img
        className="object-cover w-1/2 h-screen "
        src={loginImage}
        alt="Register image"
      />
    </div>
  );
}

export default Login;
