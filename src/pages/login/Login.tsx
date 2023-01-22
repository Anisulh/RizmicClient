import { ChangeEvent, FormEvent, useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import loginImage from "./images/login_page.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IStatusState } from "../register/interface";

interface IUserLogin {
  email: string;
  password: string;
}
function Login() {
  const [userLoginData, setUserLoginData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { email, password } = userLoginData;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [loading,setLoading] = useState(false);
  const [status,setStatus] = useState<IStatusState>({
    isError: false,
    message: "",
    showStatus: false
  })

  const navigate = useNavigate();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setLoading(false);
      setStatus({ isError: true, message: "Invalid Email, please try again", showStatus: true });
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/user/login", {
        method: "POST",
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
        message: "Unable to register user",
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
    <div className="flex justify-center">
    <div className="max-w-7xl w-full flex">
        <div className = "w-1/2 flex items-center justify-center page-height">
          <div>
            <h1 className = "font-bold text-5xl pb-2">Welcome Back!</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="rounded w-full py-2 bg-ourGrey text-raisinblack
                  px-1 outline-none"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email:"
                />
              </div>
                <div className="flex items-center pb-3">
                <input
                  className="rounded w-full py-2 bg-ourGrey text-raisinblack
                  px-1 outline-none rounded-r-none"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Password:"
                />
                <button
                  className="bg-ourGrey text-white py-2 rounded-r" 
                  type="button" onClick={handleClickShowPassword}>
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6 bg-ourGrey text-black" />
                  ) : (
                    <EyeIcon className="w-6 h-6 bg-ourGrey text-black" />
                  )}
                </button>
                </div>
              <button
                className="w-full py-2 bg-cambridgeblue text-black
                px-1 outline-none"
                type="submit"
                >{loading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Log In"
                )}</button>
                <div className="flex justify-center gap-1 pb-3 pt-3">
                <p className="text-base">Don't have an account?</p>
                <Link to = "/register" className="underline" >Register</Link>
                </div>
                <p className="text-center horizontalLines" >Or, login with...</p>
                <button className="flex justify-center">Google</button>
            </form>
            </div>  
        </div>
      </div>
      <img className="w-1/2 page-height rounded" src={loginImage} alt="Login page"></img>
    </div>
    </div>
  );
}

export default Login;
