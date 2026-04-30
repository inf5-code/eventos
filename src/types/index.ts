export interface Event {
  id: string;
  slug: string;
  title: string;
  artist?: string;
  category: EventCategory;
  date: string;
  dateISO: string;
  venue: string;
  city: string;
  country: string;
  price: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
  tags: string[];
  description: string;
  featured: boolean;
  soldOut: boolean;
  capacity: number;
  ticketsLeft: number;
}

export type EventCategory =
  | "musica"
  | "festivales"
  | "teatro"
  | "deportes"
  | "familia"
  | "comedia"
  | "arte";

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  slug: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  city: string;
  image: string;
  imageAlt: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  href: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}

export interface FilterState {
  category: EventCategory | "all";
  city: string;
  dateFrom: string;
  dateTo: string;
  priceMax: number;
  query: string;
}
