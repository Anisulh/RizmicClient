import React, { createContext, ReactNode, useState } from "react";
import { IStatusState } from "./pages/register/interface";

export interface IErrorNotificationParams {
  message?: string | null;
  error?: unknown | null;
}

export interface IStatusContext {
  status: IStatusState;
  errorNotification: ({ message, error }: IErrorNotificationParams) => void;
  resetStatus: () => void;
}

export const StatusContext = createContext<IStatusContext | null>(null);

export const StatusContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [status, setStatus] = useState({
    isError: false,
    message: "",
    showStatus: false,
  });

  const errorNotification = ({ message, error }: IErrorNotificationParams) => {
    console.log("handling");
    if (error) {
      setStatus({
        isError: true,
        message: "Something went wrong...",
        showStatus: true,
      });
      console.log(error);
      return;
    }
    if (message) {
      setStatus({
        isError: true,
        message: message,
        showStatus: true,
      });
    }
  };

  const resetStatus = () => {
    setStatus({
      isError: false,
      message: "",
      showStatus: false,
    });
  };

  const value = {
    status,
    errorNotification,
    resetStatus,
  };
  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};
