import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserContext, UserContext } from "../UserContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return children;
}
