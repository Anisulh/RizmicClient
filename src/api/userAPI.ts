import { IRegisterAPIParams } from "../interface/userInterface";
import { IPasswordData } from "../pages/passwordReset/PasswordResetFormValidation";

const baseURL = "http://localhost:7001/user/";

export const registerAPI = async ({
  userData,
  credential,
}: IRegisterAPIParams) => {
  const url = new URL(baseURL + "register");
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
  const url = new URL("forgotpassword", baseURL);
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
  const url = new URL("passwordreset", baseURL);
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
