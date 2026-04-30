import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
            {label}
            {props.required && <span className="text-accent-300 ml-1" aria-hidden>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-base text-slate-100",
            "placeholder:text-slate-500 outline-none",
            "transition-colors duration-200",
            "focus:border-brand-300 focus:ring-2 focus:ring-brand-300/20",
            error && "border-accent-300 focus:border-accent-300 focus:ring-accent-300/20",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-err`} role="alert" className="text-xs text-accent-300 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-none" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-slate-500">{hint}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
