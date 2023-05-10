import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../api/userAPI";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
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
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (email: string) => forgotPasswordAPI(email),
    onSuccess(data) {
      if (data.message) {
        setError({
          message: `If your email was registered, you will receive an email to reset password.`,
        });
        console.log(data.message);
      } else {
        navigate("/login");
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      try {
        mutate(email);
        setError({
          message: `If your email was registered, you will receive an email to reset password.`,
        });
      } catch (error) {
        setError({ error });
      }
    } else {
      setError({ message: "Enter a valid email" });
    }
  };

  return (
    <div className="flex content-container">
      <div className="m-auto justify-center">
        <h1 className="font-bold text-4xl">Forgot Password</h1>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-2 py-2 px-3 placeholder-raisinblack"
            required
            onChange={handleChange}
          ></input>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-2 border rounded-md text-raisinblack px-4 py-2 font-medium w-full bg-cambridgeblue"
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
      </div>
    </div>
  );
}

export default ForgotPassword;
