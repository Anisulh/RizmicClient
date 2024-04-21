import { useToast } from "../../../contexts/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
