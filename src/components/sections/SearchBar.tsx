"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/eventos?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="bg-bg-base/95 backdrop-blur-md sticky top-[57px] z-30 px-4 py-3 border-b border-border/40">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Buscar eventos"
        className="relative flex items-center bg-bg-card border border-border rounded-xl px-3 py-2
                   focus-within:border-brand-300/60 focus-within:ring-2 focus-within:ring-brand-300/15
                   transition-all duration-200 max-w-3xl mx-auto"
      >
        <label htmlFor="search-events" className="sr-only">Buscar eventos</label>
        <Search className="w-5 h-5 flex-none text-slate-500" aria-hidden />
        <input
          id="search-events"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar eventos, artistas, recintos..."
          className="ml-2 flex-grow text-slate-200 text-base bg-transparent outline-none
                     placeholder:text-slate-500 min-w-0"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => router.push("/eventos")}
          aria-label="Filtros avanzados"
          className="w-8 h-8 flex-none rounded-lg bg-bg-layer border border-border
                     flex items-center justify-center text-slate-400
                     hover:text-brand-300 hover:border-brand-300/40 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
