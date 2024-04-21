import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { IToast } from "../../../contexts/ToastContext";
import cn from "../cn";

const variantClasses = {
  success: "bg-green-200 text-green-800",
  error: "bg-red-200 text-red-800",
  info: "bg-sapphireBlue-100",
};

export default function Toast({
  id,
  title,
  description,
  type = "info",
  duration = 5000,
  removeToast,
}: IToast) {
  const [isPaused, setIsPaused] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPaused) removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, isPaused, removeToast, duration]);

  const closeToast = () => {
    setShow(false);
    removeToast(id);
  };

  return (
    <Transition
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 translate-y-2"
      enterTo="transform opacity-100 translate-y-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform opacity-100 translate-y-0"
      leaveTo="transform opacity-0 translate-y-2"
      beforeLeave={() => removeToast(id)}
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
        <button onClick={() => closeToast()} className="float-right">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
    </Transition>
  );
}
