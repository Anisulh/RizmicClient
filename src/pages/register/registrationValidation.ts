import { Dispatch, SetStateAction } from "react";
import { IRegisterUser, IStatusState } from "./interface";

export const registerFormValidation = (
  userData: IRegisterUser,
  setStatus: Dispatch<SetStateAction<IStatusState>>,
  passwordStrength: "weak" | "medium" | "strong"
) => {
  const { firstName, lastName, email, password, confirmPassword } = userData;

  const emailRegEx = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    setStatus({
      isError: true,
      message: "Please fill out all fields",
      showStatus: true,
    });
    return false;
  }
  if (!emailRegEx.test(email)) {
    setStatus({
      isError: true,
      message: "Email entered is not a valid email",
      showStatus: true,
    });
    return false;
  }
  if (password !== confirmPassword) {
    setStatus({
      isError: true,
      message: "Passwords do not match",
      showStatus: true,
    });
    return false;
  }
  if (passwordStrength === "weak") {
    setStatus({
      isError: true,
      message: "Please enter a stronger password",
      showStatus: true,
    });
    return false;
  }
  setStatus({ isError: false, message: "", showStatus: false });
  return true;
};
