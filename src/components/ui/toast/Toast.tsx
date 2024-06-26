import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import cn from "../cn";
import { IToast } from "../../../contexts/ToastContext";

interface IToastComponent extends IToast {
  removeToast: (id: number) => void;
}

const variantClasses = {
  success: "bg-green-200 text-green-800",
  error: "bg-red-200 text-red-800",
  info: "bg-blue-200 text-blue-800",
  warning: "bg-yellow-200 text-yellow-800",
};

export default function Toast({
  id,
  title,
  description,
  type = "info",
  duration = 5000,
  removeToast,
}: IToastComponent) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPaused) removeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, isPaused, removeToast, duration]);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className={cn(
          "cursor-pointer rounded-xl p-4 shadow-lg",
          variantClasses[type],
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        role="alert"
        aria-live="assertive"
      >
        <button onClick={() => removeToast(id)} className="float-right">
          <XMarkIcon className="size-6" />
        </button>
        <strong>{title}</strong>
        <span className="block">{description}</span>
      </div>
    </Transition>
  );
}
