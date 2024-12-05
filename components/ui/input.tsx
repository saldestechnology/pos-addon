import cn from "classnames";
import { forwardRef } from "react";
import { BsExclamationCircle } from "react-icons/bs";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      startIcon,
      endIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              {
                "pl-10": startIcon,
                "pr-10": endIcon || error,
                "border-red-500 ring-red-500": error,
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
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}

          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <BsExclamationCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            id={error ? `${id}-error` : `${id}-description`}
            className={cn("text-sm", error ? "text-red-500" : "text-gray-500")}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
