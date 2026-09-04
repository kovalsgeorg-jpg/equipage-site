"use client";

import { useEffect, useRef } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { orderSteps } from "@/config/site";

/**
 * «Дорога заказа»: пять остановок вдоль пунктирного маршрута.
 * Линия прорисовывается по мере прокрутки: экипаж едет к вашему событию.
 * Номера остановок оставлены сознательно: последовательность здесь и есть смысл.
 */
export function Process() {
  const ref = useRef<SVGPathElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = ref.current;
    const box = wrap.current;
    if (!path || !box) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
      path.style.strokeDashoffset = String(len * (1 - progress));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" data-tone="umber" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="process-title"
            title="Дорога заказа: пять остановок"
            lead="От первого звонка до убранного стола: как экипаж доезжает до вашего события."
          />
        </Reveal>

        <div ref={wrap} className="relative mt-16">
          <svg
            aria-hidden="true"
            className="road absolute left-[22px] top-0 hidden h-full w-px overflow-visible md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <path
              ref={ref}
              d="M1 0 V100"
              stroke="var(--brass)"
              strokeOpacity="0.6"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="space-y-12 md:space-y-14">
            {orderSteps.map((step, i) => (
              <li key={step.title} className="relative md:pl-20">
                <Reveal delay={i * 60}>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-11 w-11 items-center justify-center rounded-full border border-brass bg-umber font-display text-lg text-brass md:flex"
                  >
                    {i + 1}
                  </span>
                  <div className="flex items-baseline gap-4 md:block">
                    <span
                      aria-hidden="true"
                      className="font-display text-lg text-brass md:hidden"
                    >
                      {i + 1}.
                    </span>
                    <h3 className="text-2xl sm:text-3xl">{step.title}</h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
