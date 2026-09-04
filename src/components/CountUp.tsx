"use client";

import { useEffect, useRef } from "react";

const grouped = new Intl.NumberFormat("ru-RU");

/** Число, досчитывающее до значения при входе в кадр.
 *  plain — без разделителей разрядов (для годов: «2003», не «2 003»).
 *  Внутри всегда отрендерено финальное значение: без JS, при
 *  prefers-reduced-motion и в поисковой выдаче виден готовый факт. */
export function CountUp({
  value,
  from = 0,
  plain = false,
}: {
  value: number;
  from?: number;
  plain?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => (plain ? String(n) : grouped.format(n));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(from + (value - from) * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, from, plain]);

  return <span ref={ref}>{fmt(value)}</span>;
}
