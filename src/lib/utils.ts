import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getUrgencyLabel(ticketsLeft: number): string | null {
  if (ticketsLeft === 0) return "Agotado";
  if (ticketsLeft < 50)  return `¡Solo quedan ${ticketsLeft}!`;
  if (ticketsLeft < 100) return "Pocas entradas";
  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
