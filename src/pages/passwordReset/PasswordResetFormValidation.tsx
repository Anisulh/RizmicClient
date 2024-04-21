import { useEffect, useState } from "react";
export interface IPasswordData {
  password: string;
  confirmPassword: string;
}

export const passwordResetFormValidation = (
  passwordData: IPasswordData,
  passwordStrength: "weak" | "medium" | "strong",
) => {
  const { password, confirmPassword } = passwordData;

  if (!password || !confirmPassword) {
    console.log({
      message: "Please fill out all fields",
    });
    return false;
  }

  if (password !== confirmPassword) {
    console.log({
      message: "Passwords do not match",
    });
    return false;
  }
  if (passwordStrength === "weak") {
    console.log({
      message: "Please enter a stronger password",
    });
    return false;
  }
  console.log({ message: "" });
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
