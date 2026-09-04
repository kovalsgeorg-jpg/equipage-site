"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { menuFormats, menuItems, menuPdf } from "@/config/site";

type FormatId = (typeof menuFormats)[number]["id"];

/** Меню: кремовая сцена, «свет включили над столом». */
export function MenuSection() {
  const [format, setFormat] = useState<FormatId>("all");
  const items =
    format === "all" ? menuItems : menuItems.filter((m) => m.format === format);

  return (
    <section id="menu" aria-labelledby="menu-title" className="scene-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="menu-title"
            title="Что будет на столе"
            lead="Примеры категорий из нашего меню. Точный состав и цены собираем под событие и присылаем вместе со сметой."
            onCream
          />
        </Reveal>

        <div
          role="group"
          aria-label="Фильтр меню по формату мероприятия"
          className="mt-10 flex flex-wrap gap-2"
        >
          {menuFormats.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              aria-pressed={format === f.id}
              className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${
                format === f.id
                  ? "border-[#22231f] bg-[#22231f] text-cream"
                  : "border-[#ddd3bf] text-[#4c4a40] hover:border-brass-deep hover:text-[#22231f]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <li key={m.title}>
              <article className="group">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl">{m.title}</h3>
                <p className="mt-2 text-[15px] text-[#4c4a40]">{m.text}</p>
                {m.price ? (
                  <p className="mt-3 text-[14px] font-medium text-accent-ink">
                    {m.price}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="#lead" className="btn btn-dark">
            Запросить меню и смету
          </a>
          {menuPdf ? (
            <a href={menuPdf} className="btn btn-outline-dark" download>
              Скачать меню (PDF)
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
