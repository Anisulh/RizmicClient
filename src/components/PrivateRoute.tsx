import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import Spinner from "./ui/spinner/Spinner";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { validateToken, isAuthenticated } = useAuth();
  useEffect(() => {
    const checkToken = async () => {
      await validateToken();
      setLoading(false);
    };
    checkToken();
  }, [navigate, validateToken]);

  if (loading) return <Spinner />;
  if (!isAuthenticated) navigate("/login");
  return children;
}
