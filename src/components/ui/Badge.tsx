import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "accent" | "cta" | "cyan" | "muted" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  brand:  "bg-brand-300/15 text-brand-300 ring-1 ring-brand-300/30",
  accent: "bg-accent-300/15 text-accent-300 ring-1 ring-accent-300/30",
  cta:    "bg-cta-200/15 text-cta-200 ring-1 ring-cta-200/30",
  cyan:   "bg-cyan-200/15 text-cyan-200 ring-1 ring-cyan-200/30",
  muted:  "bg-white/8 text-slate-400 ring-1 ring-white/10",
  danger: "bg-accent-300/20 text-accent-300 ring-1 ring-accent-300/40",
};

export function Badge({ variant = "brand", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
