import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";
import cn from "./cn";

interface InputProps<T extends FieldValues> {
  type: string;
  label: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  errorText?: string;
  className?: string;
}

function Input<T extends FieldValues>({
  type,
  label,
  name,
  placeholder,
  register,
  error,
  errorText,
  className,
}: InputProps<T>) {
  return (
    <div className="my-2 lg:my-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          onChange: (e) => {
            const trimmedValue = e.target.value.trim();
            e.target.value = trimmedValue; // Update the value with trimmed input
          },
        })}
        className={cn(
          "rounded-lg block w-full text-raisinblack placeholder-gray-400",
          className,
        )}
      />
      {error && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}

export default Input;
