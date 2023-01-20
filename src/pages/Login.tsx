import { ChangeEvent, FormEvent, useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";

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
  <body className="bg-gradient-to-r from-lavendarblush to-cambridgeblue ">
    <div className = "container mx-auto flex items-center justify-center page-height">
      <div>
      <h1 className = "font-bold text-5xl pb-3">Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className= "text-slategrey">Username</label>
            <input
              className="rounded w-full py-2 bg-raisinblack text-lavendarblush
               px-1 outline-none"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
            <label className= "text-slategrey">Password</label>
            <div className="flex items-center pb-3">
            <input
              className="rounded w-full py-2 bg-raisinblack text-lavendarblush
              px-1 outline-none rounded-r-none"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              className="bg-raisinblack text-white py-2 rounded-r" 
              type="button" onClick={handleClickShowPassword}>
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 bg-raisinblack text-white" />
              ) : (
                <EyeIcon className="w-6 h-6 bg-raisinblack text-white" />
              )}
            </button>
            </div>
          <button
            className="w-full py-2 bg-cambridgeblue text-lavendarblush
            px-1 outline-none"
            type="submit">Log In</button>
        </form>
        </div>
      </div>
    </div>
  </body>
  );
}

export default Login;
