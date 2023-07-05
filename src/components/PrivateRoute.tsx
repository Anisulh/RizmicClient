import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserContext, UserContext } from "../contexts/UserContext";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { validateToken } = useContext(UserContext) as IUserContext;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await validateToken();

        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate, validateToken]);

  if (isAuthenticated === null) return <Spinner />;
  return children;
}
