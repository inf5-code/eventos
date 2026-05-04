"use client";

import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "cta" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-300 text-bg-base font-semibold hover:bg-brand-200 focus-visible:ring-brand-300",
  secondary:
    "border border-brand-300 text-brand-300 hover:bg-brand-300/10 focus-visible:ring-brand-300",
  ghost:
    "text-slate-300 hover:text-white hover:bg-white/5 focus-visible:ring-white/30",
  cta:
    "bg-cta-200 text-bg-base font-semibold hover:bg-cta-100 focus-visible:ring-cta-200",
  danger:
    "bg-accent-300 text-bg-base font-semibold hover:bg-accent-200 focus-visible:ring-accent-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  "px-3 py-1.5 text-sm rounded",
  md:  "px-5 py-2.5 text-base rounded-md",
  lg:  "px-7 py-3.5 text-lg rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  asChild,
  ref,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 cursor-pointer",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ref,
      className: cn(child.props.className as string | undefined, classes),
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={classes}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      )}
      {children}
    </button>
  );
}
Button.displayName = "Button";
