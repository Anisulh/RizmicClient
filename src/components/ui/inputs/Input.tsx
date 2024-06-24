import { Controller, Control, FieldValues, Path } from "react-hook-form";
import cn from "../cn";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  formatInput?: (value: string) => string | void; // Optional prop for custom input formatting
  customRef?: React.RefObject<HTMLElement>;
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  required = true,
  placeholder,
  className,
  formatInput,
}: InputProps<T>) => {
  return (
    <div className={cn("my-2 w-full", className)}>
      <label
        className="flex gap-1 text-sm font-medium text-gray-700 md:text-base dark:text-white"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                let val = e.target.value;
                if (type === "tel" && formatInput) {
                  val = formatInput(val) || val; // Apply formatting if specified
                } else if (formatInput) {
                  formatInput(val);
                }
                onChange(val); // Update form state
              }}
              onBlur={onBlur}
              ref={ref}
              id={name}
              className="block w-full rounded-lg border-gray-300 text-sm text-raisinblack placeholder-gray-400 shadow-sm focus:border-raisinblack focus:ring-raisinblack md:text-base dark:border-gray-600 dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
