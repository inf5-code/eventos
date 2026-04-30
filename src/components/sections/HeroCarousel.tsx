"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";
import { Button } from "@/components/ui/Button";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      setDirection(dir);
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const startTimer = useCallback(() => {
    if (reduced.current) return;
    timerRef.current = setInterval(() => goTo((current + 1) % slides.length, "next"), 5500);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleNav = (dir: "next" | "prev") => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(dir === "next" ? current + 1 : current - 1, dir);
    timerRef.current = setInterval(() => goTo((current + 1) % slides.length, "next"), 5500);
  };

  const slide = slides[current];

  return (
    <section
      aria-label="Eventos destacados"
      aria-roledescription="carrusel"
      className="relative overflow-hidden rounded-xl bg-bg-card"
      style={{ aspectRatio: "16/7", minHeight: 300 }}
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== current}
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            i === current
              ? "opacity-100 translate-x-0"
              : direction === "next"
              ? i === (current - 1 + slides.length) % slides.length
                ? "opacity-0 -translate-x-8"
                : "opacity-0 translate-x-8"
              : i === (current + 1) % slides.length
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8",
          )}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            className="object-cover hero-mask"
            sizes="(max-width:768px) 100vw, 1400px"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 sm:p-8 md:p-10 z-10 max-w-2xl">
        <div className="flex gap-2 mb-3">
          <span className="border border-brand-300/60 text-brand-300 text-xs px-3 py-1 rounded-full">
            {slide.tag}
          </span>
          <span className="border border-border text-slate-300 text-xs px-3 py-1 rounded">
            {slide.city}
          </span>
        </div>

        <h1
          key={slide.id}
          className="font-display font-bold text-white leading-[1] mb-3 whitespace-pre-line
                     animate-fade-up"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
        >
          {slide.title}
        </h1>

        <p className="text-slate-300 mb-5 animate-fade-up" style={{ fontSize: "clamp(0.9rem,1.5vw,1.2rem)" }}>
          {slide.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up">
          <Button variant="cta" size="md" asChild>
            <Link href={slide.href}>{slide.ctaPrimary}</Link>
          </Button>
          {slide.ctaSecondary && (
            <Button variant="secondary" size="md" asChild>
              <Link href={slide.href}>{slide.ctaSecondary}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => handleNav("prev")}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full bg-bg-base/70 backdrop-blur-sm
                   items-center justify-center text-white
                   hover:bg-brand-300/20 hover:text-brand-300 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden />
      </button>
      <button
        onClick={() => handleNav("next")}
        aria-label="Slide siguiente"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full bg-bg-base/70 backdrop-blur-sm
                   items-center justify-center text-white
                   hover:bg-brand-300/20 hover:text-brand-300 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" aria-hidden />
      </button>

      {/* Dots */}
      <div
        role="tablist"
        aria-label="Navegación de slides"
        className="absolute bottom-4 right-4 z-10 flex gap-2"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); goTo(i, i > current ? "next" : "prev"); }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
              i === current
                ? "bg-brand-300 w-5 shadow-brand"
                : "bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </div>

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic className="sr-only">
        Slide {current + 1} de {slides.length}: {slide.title.replace("\n", " ")}
      </div>
    </section>
  );
}
