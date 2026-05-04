import { Suspense } from "react";
import { HeroCarousel }        from "@/components/sections/HeroCarousel";
import { CategoryCards }       from "@/components/sections/CategoryCards";
import { SearchBar }           from "@/components/sections/SearchBar";
import { ArtistsRow }          from "@/components/sections/ArtistsRow";
import { EventsGrid }          from "@/components/sections/EventsGrid";
import { HorizontalEventCards } from "@/components/sections/HorizontalEventCards";
import { NewsletterSection }   from "@/components/sections/NewsletterSection";
import { HERO_SLIDES, EVENTS, ARTISTS, CATEGORIES } from "@/lib/data";
import { StatsBar } from "@/components/sections/StatsBar";

const featuredEvents = EVENTS.filter(e => e.featured);
const thisWeek       = EVENTS.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="px-4 pt-4 pb-0 overflow-x-hidden">
        <HeroCarousel slides={HERO_SLIDES} />
      </section>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <StatsBar />

      {/* ── Search + filter tabs ──────────────────────────── */}
      <Suspense>
        <SearchBar />
      </Suspense>

      {/* ── Category visual cards ─────────────────────────── */}
      <CategoryCards categories={CATEGORIES} />

      {/* ── Featured events grid ──────────────────────────── */}
      <EventsGrid
        title="Eventos destacados"
        events={featuredEvents}
        ctaHref="/eventos"
        ctaLabel="Ver todos"
      />

      {/* ── Artists row ───────────────────────────────────── */}
      <ArtistsRow artists={ARTISTS} />

      {/* ── All events grid ───────────────────────────────── */}
      <EventsGrid
        title="Próximos eventos"
        events={EVENTS}
        ctaHref="/eventos"
        ctaLabel="Ver calendario completo"
      />

      {/* ── This week compact list ────────────────────────── */}
      <HorizontalEventCards events={thisWeek} title="Esta semana" />

      {/* ── Newsletter CTA ────────────────────────────────── */}
      <NewsletterSection />
    </>
  );
}
