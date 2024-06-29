import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContext";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ui/toast/ToastContainer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <UserContextProvider>
        <App />
        <ToastContainer />
      </UserContextProvider>
    </ToastProvider>
  </React.StrictMode>,
);
