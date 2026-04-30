"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Artist } from "@/types";

interface ArtistsRowProps {
  artists: Artist[];
}

export function ArtistsRow({ artists }: ArtistsRowProps) {
  return (
    <section aria-labelledby="artists-heading" className="py-6">
      <SectionHeader title="Artistas destacados" cta={{ label: "Ver todos", href: "/artistas" }} />
      <div
        className="flex flex-nowrap gap-5 px-4 overflow-x-auto no-scrollbar cursor-grab select-none pb-2"
        role="list"
        aria-label="Lista de artistas destacados"
      >
        {artists.map(artist => (
          <Link
            key={artist.id}
            href={`/artista/${artist.slug}`}
            role="listitem"
            className="flex flex-col items-center gap-2 text-center flex-none
                       focus-visible:ring-2 focus-visible:ring-brand-300 rounded-lg p-1"
            style={{ width: "clamp(72px, calc((100vw - 5rem)/3.5), 140px)" }}
          >
            <div className="w-full aspect-square overflow-hidden rounded-full ring-2 ring-border
                            hover:ring-brand-300 transition-all duration-200">
              <Image
                src={artist.image}
                alt={artist.name}
                width={140}
                height={140}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <span className="text-white text-xs font-medium line-clamp-2 w-full leading-tight">
              {artist.name}
            </span>
            <span className="text-slate-500 text-xs">{artist.genre}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
