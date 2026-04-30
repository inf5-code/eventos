"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/eventos?cat=musica",     label: "Música" },
  { href: "/eventos?cat=festivales", label: "Festivales" },
  { href: "/eventos?cat=teatro",     label: "Teatro" },
  { href: "/eventos?cat=deportes",   label: "Deportes" },
  { href: "/eventos",                label: "Todos" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido</a>

      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 w-full z-40",
          "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "bg-bg-base/95 backdrop-blur-md border-b border-border shadow-card"
            : "bg-gradient-to-b from-bg-base/80 to-transparent backdrop-blur-sm",
        )}
      >
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-300 rounded"
            aria-label="MiEventos — Inicio"
          >
            <span className="w-8 h-8 rounded-lg bg-brand-300/20 flex items-center justify-center" aria-hidden>
              <Ticket className="w-4 h-4 text-brand-300" />
            </span>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Mi<span className="text-brand-300">Eventos</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden min-[950px]:flex items-center gap-1" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-1.5 text-sm text-slate-300 hover:text-white rounded-md
                             hover:bg-white/5 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/eventos"
              aria-label="Buscar eventos"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Search className="w-5 h-5" aria-hidden />
            </Link>

            <Link
              href="/registro"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-md
                         bg-brand-300/15 text-brand-300 text-sm font-medium border border-brand-300/30
                         hover:bg-brand-300/25 transition-colors"
            >
              Entrar
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="min-[950px]:hidden p-2 text-slate-400 hover:text-white rounded-md
                         hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
