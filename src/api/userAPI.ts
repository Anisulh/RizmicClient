import { IChangePasswordData } from "../components/Profile/ChangePassword";
import { IRegisterAPIParams, IUserLogin } from "../interface/userInterface";
import { PasswordResetSchemaType } from "../pages/passwordReset/passwordResetSchema";

const baseURL = `${import.meta.env.VITE_BASE_URL}/user/`;

export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export const registerAPI = async (userData: IRegisterAPIParams) => {
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
  return response.json();
};

export const forgotPasswordAPI = async (email: string) => {
  const url = baseURL + "forgot-password";
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
  return response.json();
};

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
  return response.json();
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
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const updateProfileAPI = async (profileData: IUpdateProfile) => {
  try {
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
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getUserData = async () => {
  try {
    const url = new URL(baseURL + "get-user");
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
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateProfileImageAPI = async (image: FormData) => {
  try {
    const url = new URL(baseURL + "update-profile-image");
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
