import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name:  z.string().optional(),
});

// Simulated in-memory store (replace with your DB/email provider)
const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email } = parsed.data;

    if (subscribers.has(email)) {
      return NextResponse.json({ message: "Ya estás suscrito" }, { status: 200 });
    }

    // Simulate async work (DB insert, email provider call, etc.)
    await new Promise(r => setTimeout(r, 300));
    subscribers.add(email);

    return NextResponse.json({ message: "Suscripción exitosa" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
