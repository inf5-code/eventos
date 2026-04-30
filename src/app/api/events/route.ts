import { NextRequest, NextResponse } from "next/server";
import { EVENTS } from "@/lib/data";
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cat   = searchParams.get("cat");
  const city  = searchParams.get("city") ?? "";
  const q     = searchParams.get("q")   ?? "";
  const page  = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(20, Number(searchParams.get("limit") ?? 8));

  let results = [...EVENTS];

  if (cat && cat !== "all")  results = results.filter(e => (e.category as string) === cat);
  if (city) results = results.filter(e => e.city.toLowerCase().includes(city.toLowerCase()));
  if (q)    results = results.filter(e =>
    e.title.toLowerCase().includes(q.toLowerCase()) ||
    e.venue.toLowerCase().includes(q.toLowerCase()) ||
    e.city.toLowerCase().includes(q.toLowerCase()),
  );

  const total  = results.length;
  const data   = results.slice((page - 1) * limit, page * limit);

  // Simulate network latency in development
  if (process.env.NODE_ENV === "development") {
    await new Promise(r => setTimeout(r, 150));
  }

  return NextResponse.json({ data, total, page, limit });
}
