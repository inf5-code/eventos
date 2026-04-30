"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { CATEGORIES } from "@/lib/data";

type CategoryItem = (typeof CATEGORIES)[number];

interface CategoryCardsProps {
  categories: readonly CategoryItem[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section aria-labelledby="categories-heading" className="py-4">
      <SectionHeader title="Explorar categorías" />
      <div
        className="flex gap-3 px-4 overflow-x-auto no-scrollbar cursor-grab select-none pb-2"
        role="list"
        aria-label="Categorías de eventos"
      >
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/eventos?cat=${cat.id}`}
            role="listitem"
            className="relative flex-none w-44 md:w-52 h-[340px] rounded-xl overflow-hidden
                       ring-1 ring-border hover:ring-brand-300/50 transition-all duration-200
                       focus-visible:ring-2 focus-visible:ring-brand-300"
            aria-label={`Ver eventos de ${cat.label}`}
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width:768px) 176px, 208px"
              loading="lazy"
            />
            <div className="cat-overlay absolute inset-0 rounded-xl" aria-hidden />
            <div className="absolute inset-0 flex items-end justify-start p-4 z-10">
              <span className="text-white text-base font-semibold drop-shadow-lg">{cat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
