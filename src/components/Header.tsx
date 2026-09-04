"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CarriageLogo } from "./CarriageLogo";
import { Container } from "./Container";
import { PhoneLink } from "./PhoneLink";
import { ThemeToggle } from "./ThemeToggle";
import { site, nav } from "@/config/site";

/**
 * Шапка поверх видео-hero: наверху прозрачная,
 * после прокрутки наливается тёмным стеклом.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "hdr-solid border-b border-line-soft bg-night/90 text-ink backdrop-blur"
          : "border-b border-transparent bg-transparent text-[#f1ead9]"
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <span className="relative block h-8 w-[66px]">
            <CarriageLogo tone="light" className="hdr-carriage-light h-full w-full object-contain" />
            <CarriageLogo tone="dark" className="hdr-carriage-dark h-full w-full object-contain" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[22px] tracking-[0.08em]">
              EQUIPAGE
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.34em] text-brass">
              кейтеринг
            </span>
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap text-[15px] opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <PhoneLink className="whitespace-nowrap text-[15px] font-medium" />
          <a
            href="#lead"
            className="btn btn-brass whitespace-nowrap !px-5 !py-2.5 text-[15px]"
          >
            Рассчитать стоимость
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform ${open ? "top-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-6 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Мобильная навигация"
          className="border-t border-line-soft bg-night text-ink lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line-soft pt-4">
              <PhoneLink className="px-2 font-medium" />
              <a href="#lead" className="btn btn-brass" onClick={() => setOpen(false)}>
                Рассчитать стоимость
              </a>
            </div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
