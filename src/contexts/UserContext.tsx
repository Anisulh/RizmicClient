import { createContext, ReactNode, useState } from "react";
import { getUserData } from "../api/userAPI";
import { IUser } from "../interface/userInterface";

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refetchUserData: () => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
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
      const response = await getUserData();
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        return;
      }
    }
  };
  const validateToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/validate`,
        { credentials: "include" },
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    refetchUserData,
    logout,
    validateToken,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
