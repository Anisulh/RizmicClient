import React from "react";
import cn from "./cn";
import ButtonSpinner from "./spinner/ButtonSpinner";

const variantClasses = {
  primary:
    "bg-ultramarineBlue hover:bg-blue-500 text-white focus-visible:outline-ultramarineBlue",
  secondary:
    "bg-cambridgeblue hover:bg-blue-500 text-raisinblack focus-visible:outline-cambridgeblue",
  destructive: "bg-red-600 hover:bg-red-400 border-red-600 text-white",
  outline: "hover:bg-ultramarineBlue",
  ghost: "bg-transparent text-gray-700 border-none p-0",
  link: "bg-transparent text-blue-500 underline border-none p-0",
  icon: "p-2 bg-transparent border-none",
  textWithIcon: "flex items-center space-x-2",
  loading:
    "flex items-center space-x-2 bg-gray-300 text-gray-500 cursor-not-allowed",
  asChild: "",
};

type Variant = keyof typeof variantClasses;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses =
    "border py-2 px-4 text-center md:text-lg font-medium rounded-lg transition-all ease-in-out duration-150 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm";

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {isLoading ? (
        <div className="flex gap-2 items-center justify-center">
          <ButtonSpinner /> Processing...
        </div>
      ) : variant === "icon" ? (
        icon
      ) : variant === "textWithIcon" ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
