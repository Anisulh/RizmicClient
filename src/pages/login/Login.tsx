import { ChangeEvent, FormEvent, useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import loginImage from "./images/login_page.jpg";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      console.log("Invalid Email, please try again");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="flex justify-center">
    <div className="max-w-7xl flex">
        <div className = "w-1/2 flex items-center justify-center page-height border-2">
          <div className="bg-ourGrey">
          <h1 className = "font-bold text-5xl pb-3">Welcome Back!</h1>
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
                className="w-full py-2 bg-cambridgeblue text-sWhite
                px-1 outline-none"
                type="submit">Log In</button>
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
