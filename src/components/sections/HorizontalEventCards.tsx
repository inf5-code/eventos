"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Event } from "@/types";

interface HorizontalEventCardsProps {
  events: Event[];
  title?: string;
}

export function HorizontalEventCards({ events, title = "Esta semana" }: HorizontalEventCardsProps) {
  return (
    <section aria-labelledby="week-heading" className="py-6 border-t border-border/50">
      <SectionHeader title={title} cta={{ label: "Ver más", href: "/eventos" }} />
      <div className="px-4 divide-y divide-border/50">
        {events.map(event => (
          <HorizontalCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function HorizontalCard({ event }: { event: Event }) {
  const [fav, setFav] = useState(false);

  return (
    <div className="flex items-start gap-4 py-4 group">
      <Link href={`/evento/${event.slug}`} className="flex items-start gap-4 flex-1 min-w-0">
        <div className="relative flex-none w-[110px] h-[110px] overflow-hidden rounded-lg bg-bg-card">
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="110px"
            loading="lazy"
          />
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap
                          bg-bg-base/80 backdrop-blur-sm text-cta-200 text-xs font-semibold
                          px-2 py-0.5 rounded">
            {event.priceLabel}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base leading-tight mb-1.5 line-clamp-2
                         group-hover:text-brand-300 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
            <Calendar className="w-3 h-3 flex-none" aria-hidden />
            <time dateTime={event.dateISO}>{event.date}</time>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin className="w-3 h-3 flex-none" aria-hidden />
            <span className="truncate">{event.venue} · {event.city}</span>
          </div>
        </div>
      </Link>
      <button
        onClick={() => setFav(v => !v)}
        aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={fav}
        className={cn(
          "flex-none w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer",
          fav
            ? "bg-accent-300/20 text-accent-300"
            : "bg-bg-layer text-slate-500 hover:text-accent-300",
        )}
      >
        <Heart className="w-4 h-4" fill={fav ? "currentColor" : "none"} aria-hidden />
      </button>
    </div>
  );
}
