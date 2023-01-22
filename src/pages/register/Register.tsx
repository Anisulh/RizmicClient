import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import Status from "../../components/Status";
import { registerFormValidation } from "./registrationValidation";
import { useNavigate } from "react-router-dom";
import { IGoogleResponse, IRegisterUser, IStatusState } from "./interface";

declare global {
  const google: any;
}

function Register() {
  const navigate = useNavigate();
  const [registerUserData, setRegisterUserData] = useState<IRegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong"
  >("weak");
  const [status, setStatus] = useState<IStatusState>({
    isError: false,
    message: "",
    showStatus: false,
  });
  const [loading, setLoading] = useState(false);
  const { isError, message, showStatus } = status;
  const { password } = registerUserData;
  const googleButton = useRef(null);
  useEffect(() => {
    const loadScript = (src: string) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
        });
      };
      script.onerror = (err) => console.log(err);
      document.body.appendChild(script);
    };
    loadScript("https://accounts.google.com/gsi/client");
  }, []);

  useEffect(() => {
    const mediumPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,}$/
    );
    const strongPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    );

    if (strongPassword.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumPassword.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  }, [password]);

  const handleGoogleSignIn = async (res: IGoogleResponse) => {
    console.log(res.credential);
    const response = await fetch("http://localhost:7000/user/register", {
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
        message: "Something went wrong when registering with google",
        showStatus: true,
      });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validated = registerFormValidation(
      registerUserData,
      setStatus,
      passwordStrength
    );
    if (validated) {
      try {
        console.log(registerUserData);
        const response = await fetch("http://localhost:7000/user/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerUserData),
        });
        if (response.ok) {
          setLoading(false);
          setStatus({ isError: false, message: "", showStatus: false });
          navigate("/");
        } else {
          setLoading(false);
          setStatus({
            isError: true,
            message: "Unable to register user",
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
    }
    setLoading(false);
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
            {loading ? (
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
