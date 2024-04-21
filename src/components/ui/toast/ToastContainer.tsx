import Toast from "./Toast";
import { useToast } from "../../../contexts/ToastContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          removeToast={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
