import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IErrorNotificationParams } from "../../StatusContext";
export interface IPasswordData {
  password: string;
  confirmPassword: string;
}

export const passwordResetFormValidation = (
  passwordData: IPasswordData,
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>,
  passwordStrength: "weak" | "medium" | "strong",
) => {
  const { password, confirmPassword } = passwordData;

  if (!password || !confirmPassword) {
    setError({
      message: "Please fill out all fields",
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
