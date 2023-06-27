import { IPasswordData } from "../pages/passwordReset/PasswordResetFormValidation";
import { IChangePasswordData } from "../components/Profile/ChangePassword";
import {
  ILoginAPIParams,
  IRegisterAPIParams,
} from "../interface/userInterface";

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

export const resetPasswordAPI = async (
  passwordData: IPasswordData,
  id: string,
  token: string,
) => {
  const url = baseURL + "passwordreset";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

export const updateProfileAPI = async (
  profileData: IUpdateProfile,
  token: string,
) => {
  try {
    const url = new URL(baseURL + "updateProfile");
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getUserData = async (token: string) => {
  try {
    const url = new URL(baseURL + "getUser");
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};

export const changePasswordAPI = async (
  passwordData: IChangePasswordData,
  token: string,
) => {
  try {
    const url = new URL(baseURL + "changePassword");
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateProfileImageAPI = async (image: FormData, token: string) => {
  try {
    const url = new URL(baseURL + "updateProfileImage");
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: image,
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
