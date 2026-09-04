"use client";

import { useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { estimator } from "@/config/site";

const fmt = new Intl.NumberFormat("ru-RU");

/** Ориентир бюджета за минуту: формат + число гостей → «от N ₽».
 *  Только подтверждённые цены «от», с честным дисклеймером. */
export function Estimator() {
  const [formatId, setFormatId] = useState<string>(estimator.formats[0].id);
  const [guests, setGuests] = useState<number>(estimator.guests.start);

  const format = estimator.formats.find((f) => f.id === formatId) ?? estimator.formats[0];
  const total = format.perGuest * guests;

  return (
    <section id="estimate" aria-labelledby="est-title" data-tone="night" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <h2 id="est-title" className="text-4xl sm:text-5xl lg:text-6xl">
            Прикиньте бюджет за минуту
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink-2">
            Двигайте число гостей и выбирайте формат: покажем, от какой суммы
            начинается такой стол.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl panel border border-line-soft p-7 sm:p-10">
            <div role="group" aria-label="Формат события" className="flex flex-wrap gap-2">
              {estimator.formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormatId(f.id)}
                  aria-pressed={formatId === f.id}
                  className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${
                    formatId === f.id
                      ? "border-brass bg-brass text-[#1c1509]"
                      : "border-line text-ink-2 hover:border-brass hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <label className="mt-8 block">
              <span className="flex items-baseline justify-between text-[15px] text-ink-2">
                Гостей
                <output className="font-display text-3xl text-ink">{guests}</output>
              </span>
              <input
                type="range"
                min={estimator.guests.min}
                max={estimator.guests.max}
                step={estimator.guests.step}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-3 w-full accent-[#c9a86c]"
              />
            </label>

            <p className="mt-8 border-t border-line-soft pt-6">
              <span className="block text-[14px] uppercase tracking-[0.18em] text-ink-2">
                {format.label} на {guests} гостей
              </span>
              <span className="mt-2 block font-display text-5xl text-brass sm:text-6xl">
                от {fmt.format(total)} ₽
              </span>
            </p>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ink-2/80">
              {estimator.disclaimer}
            </p>
            <a href="#lead" className="btn btn-brass mt-6">
              Получить точную смету
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
