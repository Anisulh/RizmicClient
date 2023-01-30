import { ILoginAPIParams, IRegisterAPIParams } from "../interface/userInterface";

const baseURL = "http://localhost:7000/user/";

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


export const loginAPI =async ({userData, credential}:ILoginAPIParams) => {
  const url = new URL(baseURL + "login");
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
}