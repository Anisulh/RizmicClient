import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import cn from "../cn";

interface Option {
  label: string;
  value: string;
}

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  isMulti?: boolean; // Optional prop to determine if multiple selection is allowed
  className?: string;
  required?: boolean
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  isMulti = false,
  className,
  required = true
}: SelectProps<T>) => {
  return (
    <div className={cn("my-2 w-full", className)}>
      <label
        className="flex gap-1 text-sm md:text-base font-medium text-gray-700 dark:text-white"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="rounded-lg block w-full text-raisinblack border-gray-300 shadow-sm focus:ring-raisinblack focus:border-raisinblack text-sm md:text-base dark:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            id={name}
            multiple={isMulti}
            value={field.value || (isMulti ? [] : "")}
            onChange={(e) => {
              const select = e.target;
              const value = isMulti
                ? Array.from(select.selectedOptions).map(
                    (option) => option.value,
                  )
                : select.value;
              field.onChange(value);
            }}
            onBlur={field.onBlur}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default Select;
