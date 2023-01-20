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
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <label>Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="button" onClick={handleClickShowPassword}>
            {showPassword ? (
              <EyeSlashIcon className="w-6 h-6 bg-white " />
            ) : (
              <EyeIcon className="w-6 h-6 bg-white" />
            )}
          </button>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
