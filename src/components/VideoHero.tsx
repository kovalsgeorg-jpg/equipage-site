"use client";

import { useEffect, useRef } from "react";
import { Container } from "./Container";
import { Magnetic } from "./Magnetic";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { heroVideo, facts } from "@/config/site";

/**
 * Кинематографичный первый экран: живая съёмка команды (13 с, луп).
 * Видео ставится на паузу вне кадра и не запускается при
 * prefers-reduced-motion или ошибке сети: остаётся постер.
 * Весь смысл продублирован текстом: страница полностью читается без видео.
 */
export function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="hero-title">
      <div className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#101208] text-[#f1ead9]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 bg-[#101208]/40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#16180f] via-[#101208]/15 to-[#101208]/30"
        />

        <Container className="relative pb-14 pt-44">
          <h1
            id="hero-title"
            className="max-w-4xl text-[13vw] leading-[0.98] sm:text-7xl lg:text-8xl"
          >
            Один экипаж
            <span className="block">
              на все <em className="not-italic text-[#c9a86c]">события</em>
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-xl text-lg text-[#f1ead9]/90">
              Привозим ресторан туда, где вы принимаете гостей: от переговорной
              на десять человек до площадки на пять тысяч. Своя кухня, свой
              транспорт, официанты и повара в штате.
            </p>
            <p className="text-sm uppercase tracking-[0.2em] text-[#c9c2ae]">
              Москва · выездной кейтеринг
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a href="#lead" className="btn btn-brass-hero">
                Получить смету за 1–2 часа
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#menu" className="btn btn-ghost-hero">
                Посмотреть меню
              </a>
            </Magnetic>
          </div>
        </Container>
      </div>

      <div data-tone="night">
        <Container>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-line-soft py-12 lg:grid-cols-4">
            {facts.map((f, i) => (
              <li key={f.label}>
                <Reveal delay={i * 90}>
                  <span className="font-display text-5xl text-ink sm:text-6xl">
                    {f.prefix}
                    <CountUp value={f.value} from={f.countFrom} plain={f.plain} />
                    {f.suffix}
                  </span>
                  <span className="mt-3 block max-w-[26ch] text-sm leading-relaxed text-ink-2">
                    {f.label}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
