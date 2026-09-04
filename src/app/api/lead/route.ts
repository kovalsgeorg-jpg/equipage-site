import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

/**
 * Приём заявки. Реального почтового сервера у проекта пока нет,
 * поэтому точка интеграции сделана явной: заявка пересылается на
 * LEAD_WEBHOOK_URL (CRM, Telegram-бот, почтовый шлюз — любой POST-приёмник).
 * Без переменной окружения роут честно отвечает 503 — форма покажет
 * посетителю телефон и почту вместо ложного «отправлено».
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "equipaj.ru",
        receivedAt: new Date().toISOString(),
        lead: parsed.data,
      }),
    });
    if (!res.ok) {
      throw new Error(`webhook responded ${res.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead forwarding failed:", error);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
