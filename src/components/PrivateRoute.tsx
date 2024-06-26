import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import Spinner from "./ui/spinner/Spinner";
import { getAuthCache } from "../utils/indexDB";

const TOKEN_VALIDATION_INTERVAL = 5 * 60 * 1000;

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { validateToken, isAuthenticated } = useAuth();
  useEffect(() => {
    const checkAuthentication = async () => {
      const tokenExpiry = await getAuthCache();
      const now = Date.now();

      if (!isAuthenticated || !tokenExpiry || tokenExpiry <= now) {
        // Token is expired or missing, validate with server
        await validateToken();
      } else if (tokenExpiry - now < TOKEN_VALIDATION_INTERVAL) {
        // Token is close to expiring, validate in background
        validateToken();
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, validateToken]);

  if (loading) return <Spinner />;

  if (!isAuthenticated) navigate("/login");

  return children;
}
