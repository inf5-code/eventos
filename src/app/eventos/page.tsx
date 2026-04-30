import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchBar }   from "@/components/sections/SearchBar";
import { FilterTabs }  from "@/components/sections/FilterTabs";
import { EventsGrid }  from "@/components/sections/EventsGrid";
import { EVENTS }      from "@/lib/data";
export const metadata: Metadata = {
  title: "Eventos",
  description: "Explora todos los eventos disponibles en España. Conciertos, festivales, teatro y más.",
};

interface PageProps {
  searchParams: Promise<{ cat?: string; q?: string; city?: string }>;
}

export default async function EventosPage({ searchParams }: PageProps) {
  const params   = await searchParams;
  const category = params.cat;
  const query    = params.q?.toLowerCase() ?? "";
  const city     = params.city?.toLowerCase() ?? "";

  const filtered = EVENTS.filter(e => {
    if (category && category !== "all" && (e.category as string) !== category) return false;
    if (query && !e.title.toLowerCase().includes(query) && !e.city.toLowerCase().includes(query)) return false;
    if (city  && !e.city.toLowerCase().includes(city))   return false;
    return true;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto w-full">
        {/* Page header */}
        <div className="px-4 pt-8 pb-2">
          <h1 className="text-2xl font-bold text-white">
            {category
              ? `Eventos de ${category.charAt(0).toUpperCase() + category.slice(1)}`
              : query
              ? `Resultados para "${params.q}"`
              : "Todos los eventos"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">{filtered.length} eventos encontrados</p>
        </div>

        {/* Sticky search + tabs */}
        <Suspense>
          <SearchBar />
          <FilterTabs />
        </Suspense>

        {/* Results */}
        {filtered.length > 0 ? (
          <EventsGrid
            title=""
            events={filtered}
            ctaHref="#"
            ctaLabel=""
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <p className="text-4xl mb-4" role="img" aria-label="Sin resultados">🔍</p>
            <h2 className="text-xl font-bold text-white mb-2">No se encontraron eventos</h2>
            <p className="text-slate-400">Prueba con otros filtros o palabras clave.</p>
          </div>
        )}
      </div>
    </>
  );
}
