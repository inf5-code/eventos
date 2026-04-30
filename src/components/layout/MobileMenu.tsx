"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Trap focus + close on Escape
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-full z-50",
          "bg-bg-layer border-l border-border",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-brand-300" aria-hidden />
            <span className="font-bold text-white">Mi<span className="text-brand-300">Eventos</span></span>
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Menú móvil" className="p-4 flex flex-col gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5
                         rounded-lg text-base font-medium transition-colors border-b border-border/40 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-3">
          <Link
            href="/registro"
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-brand-300/15 text-brand-300 text-center
                       font-medium border border-brand-300/30 hover:bg-brand-300/25 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-brand-300 text-bg-base text-center
                       font-semibold hover:bg-brand-200 transition-colors"
          >
            Registrarse gratis
          </Link>
        </div>
      </div>
    </>
  );
}
