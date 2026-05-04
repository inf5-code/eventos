import type { Metadata, Viewport } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MiEventos — Entradas para los mejores eventos",
    template: "%s | MiEventos",
  },
  description:
    "Compra entradas para conciertos, festivales, teatro, deportes y más. Los mejores eventos en España.",
  keywords: ["entradas", "eventos", "conciertos", "festivales", "teatro", "España"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "MiEventos",
    title: "MiEventos — Entradas para los mejores eventos",
    description: "Compra entradas para conciertos, festivales, teatro y más en España.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${righteous.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-base text-slate-100 antialiased">
        <Navbar />
        <main id="main-content" className="flex-1 pt-[57px] w-full overflow-x-hidden" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
