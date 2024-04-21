import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../api/userAPI";
import { useToast } from "../../contexts/ToastContext";

function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (email: string) => forgotPasswordAPI(email),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
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
        addToast({
          title: "Email sent.",
          description: `If your email was registered, you will receive an email to reset password.`,
          type: "success",
        });
      } catch (error) {
        console.error(error);
        addToast({
          title: "Something went wrong.",
          description: "Please try again.",
          type: "error",
        });
      }
    } else {
      addToast({
        title: "Invalid email.",
        description: "Enter a valid email.",
        type: "error",
      });
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
