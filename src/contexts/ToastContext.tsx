import { ReactNode, createContext, useContext, useState } from "react";

export interface IToast {
  id: number;
  title: string;
  description: string;
  type: "success" | "error" | "info";
  duration?: number;
  removeToast: (id:number) => void;
}

export interface IToastContext {
  addToast: (toast: IToast) => void;
  removeToast: (id: number) => void;
  toasts: IToast[];
}

const ToastContext = createContext<IToastContext | null>(null);

export const useToast = () => useContext(ToastContext) as IToastContext;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  function addToast(toast: IToast) {
    setToasts((currentToasts) => [
      ...currentToasts,
      { ...toast, id: Date.now() },
    ]);
  }

  const removeToast = (id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
