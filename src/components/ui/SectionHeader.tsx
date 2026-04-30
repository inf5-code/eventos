import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  cta?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({ title, cta, className }: SectionHeaderProps) {
  return (
    <div className={cn("px-4 mb-4 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2.5">
        <span className="w-3.5 h-3.5 rounded-full bg-brand-300 flex-none" aria-hidden />
        <h2 className="text-white text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {cta && (
        <a
          href={cta.href}
          className="text-brand-300 text-sm font-medium hover:text-brand-200 transition-colors"
        >
          {cta.label} →
        </a>
      )}
    </div>
  );
}
