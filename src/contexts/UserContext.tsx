import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserData } from "../api/userAPI";
import { IUser } from "../interface/userInterface";

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
  refetchUserData: () => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<void>;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useAuth = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useAuth must be used within a UserContextProvider");
  return context;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    validateToken();
  }, []);

  const refetchUserData = async (): Promise<void> => {
    if (!isAuthenticated) return;
    try {
      const data = await getUserData();
      console.log("User data fetched:", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const validateToken = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/validate`,
        { method: "GET", credentials: "include" },
      );
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error validating token:", error);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    refetchUserData,
    logout,
    validateToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
