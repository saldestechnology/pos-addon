import React from "react";
import classNames from "classnames";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  options: Option[];
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      className,
      id,
      disabled,
      options,
      value,
      placeholder,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
    };

    return (
      <div className={classNames("space-y-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={classNames(
              "text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={classNames(
              "flex h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              {
                "border-red-500 ring-red-500": error,
                "text-gray-500": !value,
              },
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${id}-error`
                : helperText
                  ? `${id}-description`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <FiChevronDown className="h-4 w-4" />
          </div>
        </div>

        {(helperText || error) && (
          <p
            id={error ? `${id}-error` : `${id}-description`}
            className={classNames(
              "text-sm",
              error ? "text-red-500" : "text-gray-500",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
