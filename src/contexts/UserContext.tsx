import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserData, logoutAPI } from "../api/userAPI";
import { IUser } from "../interface/userInterface";
import { clearAuthCache, getAuthCache, setAuthCache } from "../utils/indexDB";

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
  refetchUserData: () => Promise<IUser | undefined>;
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

  const refetchUserData = useCallback(async (): Promise<IUser | undefined> => {
    if (!isAuthenticated) return;
    try {
      const data = await getUserData();
      setUser(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const initAuth = async () => {
      const tokenExpiry = await getAuthCache();
      if (tokenExpiry && tokenExpiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        await validateToken();
        await refetchUserData();
      }
    };
    initAuth();
  }, [refetchUserData]);

  const validateToken = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/validate`,
        { method: "GET", credentials: "include" },
      );
      if (response.ok) {
        const data = await response.json();
        if (data.newToken) {
          await setAuthCache(data.tokenExpiry);
        }
        setIsAuthenticated(true);
      } else {
        await clearAuthCache();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      const tokenExpiry = await getAuthCache();
      if (tokenExpiry && tokenExpiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        await clearAuthCache();
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  };

  const logout = async (): Promise<void> => {
    await logoutAPI();
    setUser(null);
    setIsAuthenticated(false);
    await clearAuthCache();
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
