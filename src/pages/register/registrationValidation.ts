import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IRegisterUser } from "../../interface/userInterface";
import { IStatusState } from "./interface";

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

export const usePasswordValidation = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong"
  >("weak");
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

  return passwordStrength;
};
