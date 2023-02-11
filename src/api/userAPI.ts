import { IPasswordData } from "../pages/passwordReset/PasswordResetFormValidation";
import {
  ILoginAPIParams,
  IRegisterAPIParams,
} from "../interface/userInterface";

const baseURL = "http://localhost:7001/user/";

export const registerAPI = async ({
  userData,
  credential,
}: IRegisterAPIParams) => {
  const url = baseURL + "register";
  const options: RequestInit = userData
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    : credential
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credential}`,
        },
      }
    : { method: "POST" };
  const response = await fetch(url, options);
  return response.json();
};

export const forgotPasswordAPI = async (email: string) => {
  const url = baseURL + "forgotpassword";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };
  const response = await fetch(url, options);
  return response.json();
};

export const resetPasswordAPI = async (passwordData: IPasswordData) => {
  const url = baseURL + "passwordreset";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordData),
  };
  const response = await fetch(url, options);
  return response.json();
};

export const loginAPI = async ({ userData, credential }: ILoginAPIParams) => {
  const url = baseURL + "login";
  const options: RequestInit = userData
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    : credential
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credential}`,
        },
      }
    : { method: "POST" };
  const response = await fetch(url, options);
  return response.json();
};
