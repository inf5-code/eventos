import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users, Clock, ChevronLeft, Share2, Ticket } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventsGrid } from "@/components/sections/EventsGrid";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getUrgencyLabel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find(e => e.slug === slug);
  if (!event) return { title: "Evento no encontrado" };
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [{ url: event.image, width: 1200, height: 630 }],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = EVENTS.find(e => e.slug === slug);
  if (!event) notFound();

  const related = EVENTS.filter(e => e.id !== event.id && e.category === event.category).slice(0, 4);
  const urgency = getUrgencyLabel(event.ticketsLeft);
  const pct     = event.soldOut ? 100 : Math.round(((event.capacity - event.ticketsLeft) / event.capacity) * 100);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Back */}
        <Link
          href="/eventos"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-300
                     transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden /> Volver a eventos
        </Link>

        {/* Hero image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-bg-card mb-8"
             style={{ aspectRatio: "16/7" }}>
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/70 to-transparent" aria-hidden />
          {urgency && (
            <div className="absolute top-4 left-4">
              <Badge variant={event.soldOut ? "danger" : "cta"} className="text-sm px-3 py-1">
                {urgency}
              </Badge>
            </div>
          )}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">{event.category}</Badge>
              {event.tags.map(t => (
                <Badge key={t} variant="muted">{t}</Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              {event.title}
            </h1>

            <dl className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-bg-card rounded-xl border border-border">
                <Calendar className="w-5 h-5 text-brand-300 flex-none mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">Fecha</dt>
                  <dd className="text-white font-medium mt-0.5">
                    <time dateTime={event.dateISO}>{event.date}</time>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-bg-card rounded-xl border border-border">
                <MapPin className="w-5 h-5 text-accent-300 flex-none mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">Lugar</dt>
                  <dd className="text-white font-medium mt-0.5">{event.venue}</dd>
                  <dd className="text-slate-400 text-sm">{event.city}, {event.country}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-bg-card rounded-xl border border-border">
                <Users className="w-5 h-5 text-cyan-300 flex-none mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">Aforo</dt>
                  <dd className="text-white font-medium mt-0.5">{event.capacity.toLocaleString("es")}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-bg-card rounded-xl border border-border">
                <Clock className="w-5 h-5 text-cta-200 flex-none mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">Precio desde</dt>
                  <dd className="text-cta-200 font-bold text-lg mt-0.5">{event.priceLabel}</dd>
                </div>
              </div>
            </dl>

            <div>
              <h2 className="text-lg font-bold text-white mb-2">Sobre el evento</h2>
              <p className="text-slate-300 leading-relaxed">{event.description}</p>
            </div>
          </div>

          {/* Sticky CTA panel */}
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <div className="bg-bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Disponibilidad</span>
                {urgency && (
                  <Badge variant={event.soldOut ? "danger" : "cta"} className="text-xs">
                    {urgency}
                  </Badge>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-bg-muted rounded-full overflow-hidden mb-4" aria-hidden>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: pct > 80
                      ? "linear-gradient(90deg, #F9A8D4, #F472B6)"
                      : "linear-gradient(90deg, #C4B5FD, #A78BFA)",
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 mb-5">
                {event.soldOut
                  ? "Todas las entradas agotadas"
                  : `${event.ticketsLeft} de ${event.capacity.toLocaleString("es")} entradas disponibles`}
              </p>

              <div className="text-center mb-4">
                <span className="text-3xl font-display font-bold text-cta-200">{event.priceLabel}</span>
              </div>

              <Button
                variant={event.soldOut ? "ghost" : "cta"}
                size="lg"
                disabled={event.soldOut}
                className="w-full"
              >
                <Ticket className="w-5 h-5" aria-hidden />
                {event.soldOut ? "Entradas agotadas" : "Comprar entradas"}
              </Button>

              <button
                className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg
                           border border-border text-slate-400 text-sm hover:text-white
                           hover:border-border-strong transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" aria-hidden />
                Compartir evento
              </button>
            </div>

            {/* Trust signals */}
            <div className="bg-bg-card border border-border rounded-2xl p-4 space-y-2.5">
              {[
                "Pago 100% seguro",
                "Entradas garantizadas",
                "Soporte 24/7",
              ].map(signal => (
                <div key={signal} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-brand-300" aria-hidden>✓</span>
                  {signal}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Related events */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <EventsGrid
            title="Eventos similares"
            events={related}
            ctaHref={`/eventos?cat=${event.category}`}
            ctaLabel="Ver más"
          />
        </div>
      )}

      <NewsletterSection />
    </>
  );
}
