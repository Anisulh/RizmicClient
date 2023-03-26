import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserContext, UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  return children;
}
