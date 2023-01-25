import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IRegisterUser } from "../../interface/userInterface";
import { IErrorNotificationParams } from "../../StatusContext";

export const registerFormValidation = (
  userData: IRegisterUser,
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>,
  passwordStrength: "weak" | "medium" | "strong",
) => {
  const { firstName, lastName, email, password, confirmPassword } = userData;

  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    setError({
      message: "Please fill out all fields",
    });
    return false;
  }
  if (!emailRegEx.test(email)) {
    setError({
      message: "Email entered is not a valid email",
    });
    return false;
  }
  if (password !== confirmPassword) {
    setError({
      message: "Passwords do not match",
    });
    return false;
  }
  if (passwordStrength === "weak") {
    setError({
      message: "Please enter a stronger password",
    });
    return false;
  }
  setError({ message: "" });
  return true;
};

export const usePasswordValidation = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong"
  >("weak");
  useEffect(() => {
    const mediumPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,}$/,
    );
    const strongPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
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
