"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Music2, Star, Drama, Trophy, Smile, Baby, Palette } from "lucide-react";

const TABS = [
  { id: "all",       label: "Todos",     icon: Star },
  { id: "musica",    label: "Música",    icon: Music2 },
  { id: "festivales",label: "Festivales",icon: Star },
  { id: "teatro",    label: "Teatro",    icon: Drama },
  { id: "deportes",  label: "Deportes",  icon: Trophy },
  { id: "comedia",   label: "Comedia",   icon: Smile },
  { id: "familia",   label: "Familia",   icon: Baby },
  { id: "arte",      label: "Arte",      icon: Palette },
] as const;

export function FilterTabs() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const current      = searchParams.get("cat") ?? "all";

  const handleSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("cat");
    else params.set("cat", id);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      role="tablist"
      aria-label="Filtrar eventos por categoría"
      className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar"
    >
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          role="tab"
          aria-selected={current === id}
          onClick={() => handleSelect(id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
            "whitespace-nowrap transition-all duration-200 cursor-pointer border",
            current === id
              ? "bg-brand-300/15 text-brand-300 border-brand-300/40"
              : "bg-transparent text-slate-400 border-border hover:text-white hover:border-border-strong",
          )}
        >
          <Icon className="w-3.5 h-3.5 flex-none" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
