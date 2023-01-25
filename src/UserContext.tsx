import React, { createContext, ReactNode, useState } from "react";
import { IUser } from "./interface/userInterface";

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext | null>(null);

const getUser = () => {
  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") as string).hasOwn("token")
  ) {
    return JSON.parse(localStorage.getItem("user") as string);
  }
  return null;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(getUser());

  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
