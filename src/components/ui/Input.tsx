import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";
import cn from "./cn";

interface InputProps<T extends FieldValues> {
  type: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  errorText?: string;
  className?: string;
}

function Input<T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  error,
  errorText,
  className,
}: InputProps<T>) {
  return (
    <div className="my-2 lg:my-4 w-full">
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
          "border-2 border-gray-200 rounded-lg block w-full text-raisinblack py-2 px-4 placeholder-raisinblack",
          className,
        )}
      />
      {error && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}

export default Input;
