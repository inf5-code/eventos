"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Calendar, MapPin } from "lucide-react";
import { cn, getUrgencyLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  animationDelay?: number;
}

export function EventCard({ event, animationDelay = 0 }: EventCardProps) {
  const [fav, setFav] = useState(false);
  const urgency = getUrgencyLabel(event.ticketsLeft);

  return (
    <article
      className="group flex flex-col cursor-pointer animate-fade-up"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
    >
      <Link href={`/evento/${event.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg bg-bg-card">
          <Image
            src={event.image}
            alt={event.imageAlt}
            width={600}
            height={400}
            className="w-full h-[220px] md:h-[260px] object-cover transition-transform duration-500
                       group-hover:scale-105"
            loading="lazy"
          />

          {/* Bottom gradient + tags */}
          <div className="card-gradient absolute inset-0 flex items-end pb-3 pl-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="brand" className="text-xs">{event.category}</Badge>
              <Badge variant="muted"  className="text-xs">{event.city}</Badge>
            </div>
          </div>

          {/* Urgency label */}
          {urgency && (
            <div className="absolute top-3 left-3">
              <Badge variant={event.soldOut ? "danger" : "cta"} className="text-xs">
                {urgency}
              </Badge>
            </div>
          )}

          {/* Favorite */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setFav(v => !v); }}
            aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
            aria-pressed={fav}
            className={cn(
              "absolute bottom-2 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center",
              "transition-all duration-200 cursor-pointer",
              fav
                ? "bg-accent-300/20 text-accent-300"
                : "bg-bg-base/70 backdrop-blur-sm text-slate-400 hover:text-accent-300",
            )}
          >
            <Heart
              className="w-4 h-4"
              fill={fav ? "currentColor" : "none"}
              aria-hidden
            />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow py-3 border-b border-border md:border-0">
          <h3 className="text-white font-bold text-base sm:text-xl leading-[120%] mb-1.5 line-clamp-2
                         group-hover:text-brand-300 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-0.5">
            <Calendar className="w-3.5 h-3.5 flex-none" aria-hidden />
            <time dateTime={event.dateISO}>{event.date}</time>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 flex-none" aria-hidden />
            <span>{event.venue}, {event.city}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className={cn(
            "text-base font-semibold",
            event.soldOut ? "text-slate-500 line-through" : "text-cta-200",
          )}>
            {event.soldOut ? "Agotado" : event.priceLabel}
          </span>
          {!event.soldOut && (
            <span className="text-xs text-brand-300 font-medium border border-brand-300/30 px-2 py-0.5 rounded-full">
              Ver entradas
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
