import {
  IChangePasswordData,
  IRegisterUser,
  IUpdateProfile,
  IUserLogin,
} from "../interface/userInterface";
import { PasswordResetSchemaType } from "../pages/passwordReset/passwordResetSchema";

const baseURL = `${import.meta.env.VITE_BASE_URL}/user/`;

export const googleSignInAPI = async (credential: string) => {
  const url = baseURL + "google-sign-in";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credential}`,
    },
    credentials: "include",
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const loginAPI = async (userData: IUserLogin) => {
  const url = baseURL + "login";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  };

  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const registerAPI = async (userData: IRegisterUser) => {
  const url = baseURL + "register";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  };

  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const forgotPasswordAPI = async (data: { email: string }) => {
  const url = baseURL + "forgot-password";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const resetPasswordAPI = async ({
  data,
  token,
}: {
  data: PasswordResetSchemaType;
  token: string;
}) => {
  const url = baseURL + "password-reset";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      token: token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const updateProfileAPI = async (profileData: IUpdateProfile) => {
  const url = new URL(baseURL + "update-profile");
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profileData),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const getUserData = async () => {
  const url = new URL(baseURL + "get-user");
  const options: RequestInit = {
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const changePasswordAPI = async (passwordData: IChangePasswordData) => {
  const url = new URL(baseURL + "change-password");
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(passwordData),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const updateProfileImageAPI = async (image: FormData) => {
  const url = new URL(baseURL + "update-profile-image");
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    body: image,
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const logoutAPI = async () => {
  const url = new URL(baseURL + "logout");
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export const deleteAccountAPI = async () => {
  const url = new URL(baseURL + "delete-account");
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
}
