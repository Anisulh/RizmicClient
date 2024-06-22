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
        className="text-sm md:text-base font-medium text-gray-700 dark:text-white flex gap-1"
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
              className="rounded-lg block w-full text-raisinblack border-gray-300 shadow-sm focus:ring-raisinblack focus:border-raisinblack text-sm md:text-base dark:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
