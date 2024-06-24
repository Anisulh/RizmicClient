import Toast from "./Toast";
import { useToast } from "../../../contexts/ToastContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-0 top-0 z-50 space-y-2 p-4">
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
