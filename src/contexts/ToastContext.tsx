import React, { createContext, useContext, useState, useCallback } from 'react';

export interface IToast {
  id: number;
  title: string;
  description?: string;
  type: "success" | "error" | "info";
  duration?: number;
}

interface IToastContext {
  addToast: (toast: Omit<IToast, 'id'>) => void;
  removeToast: (id: number) => void;
  toasts: IToast[];
}

const ToastContext = createContext<IToastContext | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback((toast: Omit<IToast, 'id'>) => {
    setToasts((currentToasts) => [...currentToasts, { ...toast, id: Date.now() }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
