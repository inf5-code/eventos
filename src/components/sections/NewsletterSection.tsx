"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().email("Introduce un email válido"),
  name: z.string().min(2, "Mínimo 2 caracteres").optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al suscribirse");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden bg-gradient-to-br from-bg-layer via-bg-layer to-bg-base
                 border-t border-b border-border py-16 px-4"
    >
      {/* Decorative blobs */}
      <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-300/5 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-300/5 blur-3xl" />

      <div className="relative max-w-lg mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-300/15 border border-brand-300/30
                        flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-brand-300" aria-hidden />
        </div>

        <h2 id="newsletter-heading" className="text-white font-display font-bold text-2xl md:text-3xl mb-2">
          No te pierdas ningún evento
        </h2>
        <p className="text-slate-400 mb-8">
          Recibe las mejores entradas y ofertas exclusivas antes que nadie.
        </p>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3 text-brand-300"
          >
            <CheckCircle2 className="w-12 h-12" aria-hidden />
            <p className="text-lg font-medium">¡Suscripción confirmada!</p>
            <p className="text-sm text-slate-400">Revisa tu email para confirmar.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
            aria-label="Formulario de suscripción al newsletter"
          >
            <Input
              label="Nombre (opcional)"
              placeholder="Tu nombre"
              autoComplete="given-name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            {status === "error" && (
              <p role="alert" className="text-accent-300 text-sm text-center">
                Algo salió mal. Inténtalo de nuevo.
              </p>
            )}
            <Button
              type="submit"
              variant="cta"
              size="lg"
              loading={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Suscribiendo…</>
              ) : "Suscribirme gratis"}
            </Button>
            <p className="text-xs text-slate-500 text-center">
              Sin spam. Puedes darte de baja en cualquier momento.{" "}
              <a href="/privacidad" className="underline hover:text-slate-300">Política de privacidad</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
