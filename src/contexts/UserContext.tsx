import React, { createContext, ReactNode, useState } from "react";
import { getUserData } from "../api/userAPI";
import { IUser } from "../interface/userInterface";

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refetchUserData: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

const getUser = () => {
  const user: string | null | undefined = localStorage.getItem("user");
  if (user && user !== undefined) {
    return JSON.parse(user);
  }
  return null;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(getUser());

  const refetchUserData = async () => {
    if (user) {
      const token = user.token;
      const response = await getUserData(token);
      if (response?.ok) {
        const data = await response.json();
        setUser({ ...data, token });
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify({ ...data, token }));
        return;
      }
    }
  };

  const value = {
    user,
    setUser,
    refetchUserData,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
