import { IChangePasswordData } from "../components/Profile/ChangePassword";
import {
  ILoginAPIParams,
  IRegisterAPIParams,
} from "../interface/userInterface";
import { PasswordResetSchemaType } from "../pages/passwordReset/passwordResetSchema";

const baseURL = `${import.meta.env.VITE_BASE_URL}/user/`;

export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

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
        credentials: "include",
        body: JSON.stringify(userData),
      }
    : credential
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credential}`,
        },
        credentials: "include",
      }
    : { method: "POST", credentials: "include" };
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
    credentials: "include",
    body: JSON.stringify({ email }),
  };
  const response = await fetch(url, options);
  return response.json();
};

export const resetPasswordAPI = async (
  passwordData: PasswordResetSchemaType,
  id: string,
  token: string,
) => {
  const url = baseURL + "passwordreset";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId: id, token: token, password: passwordData }),
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
        credentials: "include",
        body: JSON.stringify(userData),
      }
    : credential
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credential}`,
        },
        credentials: "include",
      }
    : { method: "POST", credentials: "include" };
  const response = await fetch(url, options);
  if(!response.ok){
    throw new Error(response.statusText);
  }
  return response.json();
};

export const updateProfileAPI = async (profileData: IUpdateProfile) => {
  try {
    const url = new URL(baseURL + "updateProfile");
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getUserData = async () => {
  try {
    const url = new URL(baseURL + "getUser");
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const changePasswordAPI = async (passwordData: IChangePasswordData) => {
  try {
    const url = new URL(baseURL + "changePassword");
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(passwordData),
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateProfileImageAPI = async (image: FormData) => {
  try {
    const url = new URL(baseURL + "updateProfileImage");
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      body: image,
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
