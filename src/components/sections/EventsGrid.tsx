import { EventCard } from "./EventCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Event } from "@/types";

interface EventsGridProps {
  title: string;
  events: Event[];
  ctaHref?: string;
  ctaLabel?: string;
}

export function EventsGrid({ title, events, ctaHref = "/eventos", ctaLabel = "Ver todos" }: EventsGridProps) {
  return (
    <section aria-labelledby="events-heading" className="py-8">
      <SectionHeader
        title={title}
        cta={{ label: ctaLabel, href: ctaHref }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} animationDelay={i * 60} />
        ))}
      </div>
    </section>
  );
}
